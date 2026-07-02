from __future__ import annotations

import sys
from collections import Counter, deque
from pathlib import Path

import numpy as np
from PIL import Image


ALLOWED_EXTENSIONS = {".webp", ".jpg", ".jpeg", ".png", ".avif"}
ALPHA_EXTENSIONS = {".webp", ".png", ".avif"}


def has_transparent_edge(arr: np.ndarray) -> bool:
    alpha = arr[:, :, 3]
    height, width = alpha.shape
    edge_width = max(30, min(height, width) // 20)
    edge = np.concatenate(
        [
            alpha[:edge_width, :].reshape(-1),
            alpha[-edge_width:, :].reshape(-1),
            alpha[:, :edge_width].reshape(-1),
            alpha[:, -edge_width:].reshape(-1),
        ]
    )
    return int((edge < 8).sum()) > max(1200, round(edge.size * 0.05))


def edge_exact_mask(arr: np.ndarray, tolerance: int = 7) -> np.ndarray:
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3]
    height, width = alpha.shape
    edge_width = max(60, min(height, width) // 12)

    edge = np.concatenate(
        [
            rgb[:edge_width, :, :].reshape(-1, 3),
            rgb[-edge_width:, :, :].reshape(-1, 3),
            rgb[:, :edge_width, :].reshape(-1, 3),
            rgb[:, -edge_width:, :].reshape(-1, 3),
        ]
    )

    spread_edge = edge.max(axis=1) - edge.min(axis=1)
    bright_edge = edge.max(axis=1)
    grayish_edge = (spread_edge <= 8) & (bright_edge >= 210)
    quantized = (edge[grayish_edge] // 2) * 2
    colors = [np.array(color, dtype=np.int16) for color, _ in Counter(map(tuple, quantized)).most_common(12)]
    if not colors:
        return np.zeros((height, width), dtype=bool)

    spread = rgb.max(axis=2) - rgb.min(axis=2)
    bright = rgb.max(axis=2)
    distance = np.min(np.stack([np.abs(rgb - color).max(axis=2) for color in colors]), axis=0)
    candidate = (alpha < 8) | ((distance <= tolerance) & (spread <= 14) & (bright >= 205))

    visited = np.zeros((height, width), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    def enqueue(y: int, x: int) -> None:
        if candidate[y, x] and not visited[y, x]:
            visited[y, x] = True
            queue.append((y, x))

    for x in range(width):
        enqueue(0, x)
        enqueue(height - 1, x)
    for y in range(height):
        enqueue(y, 0)
        enqueue(y, width - 1)

    while queue:
        y, x = queue.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < height and 0 <= nx < width:
                enqueue(ny, nx)

    return visited


def clean_one(path: Path) -> tuple[Path, float] | None:
    image = Image.open(path).convert("RGBA")
    arr = np.array(image)
    if has_transparent_edge(arr):
        return None

    mask = edge_exact_mask(arr)
    removed_opaque = int(((arr[:, :, 3] >= 8) & mask).sum())
    min_pixels_to_change = max(1500, round(mask.size * 0.004))
    if removed_opaque < min_pixels_to_change:
        return None

    arr[mask, 3] = 0
    cleaned = Image.fromarray(arr, "RGBA")
    extension = path.suffix.lower()
    target = path if extension in ALPHA_EXTENSIONS else path.with_suffix(".webp")
    temp = target.with_name(f"{target.name}.cleaning.tmp{target.suffix}")

    if target.suffix.lower() == ".png":
        cleaned.save(temp, optimize=True)
    else:
        cleaned.save(temp, quality=92, method=6)

    temp.replace(target)
    return target, round(removed_opaque / mask.size * 100, 1)


def main() -> int:
    products_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / "assets" / "products"
    if not products_dir.exists():
        return 0

    cleaned: list[tuple[str, str, float]] = []
    for file_path in sorted(products_dir.iterdir()):
        if not file_path.is_file() or file_path.suffix.lower() not in ALLOWED_EXTENSIONS:
            continue
        try:
            result = clean_one(file_path)
        except Exception as error:  # noqa: BLE001
            print(f"Photo cleanup skipped for {file_path.name}: {error}", file=sys.stderr)
            continue
        if result:
            target, percent = result
            cleaned.append((file_path.name, target.name, percent))

    if cleaned:
        print(f"Cleaned product photos: {len(cleaned)}")
        for source, target, percent in cleaned:
            renamed = "" if source == target else f" -> {target}"
            print(f"- {source}{renamed}: removed {percent}% background")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
