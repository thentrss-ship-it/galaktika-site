from __future__ import annotations

import json
import math
import re
import shutil
from collections import deque
from pathlib import Path
from statistics import median

from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parents[1]
SOURCE_MANIFEST = ROOT / "data" / "productImageManifest.ts"
PREVIEW_MANIFEST = ROOT / "data" / "productPreviewManifest.ts"
PREVIEW_ROOT = ROOT / "public" / "product-previews"
CANVAS_SIZE = 900
MAX_PROCESS_SIZE = 1400


def read_source_manifest() -> dict[str, str]:
    text = SOURCE_MANIFEST.read_text(encoding="utf-8")
    match = re.search(r"=\s*(\{[\s\S]*?\});", text)
    if not match:
        raise RuntimeError("Cannot find product image map in productImageManifest.ts")
    return json.loads(match.group(1))


def relative_source_path(value: str) -> Path:
    return ROOT / "public" / value.removeprefix("/")


def edge_samples(image: Image.Image) -> list[tuple[int, int, int]]:
    rgb = image.convert("RGB")
    width, height = rgb.size
    step = max(1, min(width, height) // 32)
    samples: list[tuple[int, int, int]] = []

    for x in range(0, width, step):
        samples.append(rgb.getpixel((x, 0)))
        samples.append(rgb.getpixel((x, height - 1)))
    for y in range(0, height, step):
        samples.append(rgb.getpixel((0, y)))
        samples.append(rgb.getpixel((width - 1, y)))

    return samples


def median_color(samples: list[tuple[int, int, int]]) -> tuple[int, int, int]:
    return (
        int(median(pixel[0] for pixel in samples)),
        int(median(pixel[1] for pixel in samples)),
        int(median(pixel[2] for pixel in samples)),
    )


def color_distance(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    return math.sqrt(
        (a[0] - b[0]) ** 2 +
        (a[1] - b[1]) ** 2 +
        (a[2] - b[2]) ** 2
    )


def is_light_background(samples: list[tuple[int, int, int]], color: tuple[int, int, int]) -> bool:
    brightness = sum(color) / 3
    variance = sum(color_distance(pixel, color) for pixel in samples) / max(1, len(samples))
    return brightness > 205 and variance < 55


def remove_connected_light_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    samples = edge_samples(rgba)
    bg = median_color(samples)

    if not is_light_background(samples, bg):
        return rgba

    width, height = rgba.size
    pixels = rgba.load()
    seen = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    def matches_background(x: int, y: int) -> bool:
        r, g, b, a = pixels[x, y]
        if a < 8:
            return True
        brightness = (r + g + b) / 3
        saturation = max(r, g, b) - min(r, g, b)
        return color_distance((r, g, b), bg) < 52 or (brightness > 238 and saturation < 36)

    while queue:
        x, y = queue.popleft()
        index = y * width + x
        if seen[index]:
            continue
        seen[index] = 1

        if not matches_background(x, y):
            continue

        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)

        if x > 0:
            queue.append((x - 1, y))
        if x + 1 < width:
            queue.append((x + 1, y))
        if y > 0:
            queue.append((x, y - 1))
        if y + 1 < height:
            queue.append((x, y + 1))

    return rgba


def alpha_bbox(image: Image.Image) -> tuple[int, int, int, int] | None:
    alpha = image.getchannel("A")
    return alpha.point(lambda value: 255 if value > 12 else 0).getbbox()


def center_square_crop(image: Image.Image) -> Image.Image:
    width, height = image.size
    if 0.78 <= width / height <= 1.28:
        return image

    side = min(width, height)
    left = max(0, (width - side) // 2)
    top = max(0, (height - side) // 2)
    return image.crop((left, top, left + side, top + side))


def has_real_alpha(image: Image.Image) -> bool:
    if image.mode != "RGBA":
        return False
    stat = ImageStat.Stat(image.getchannel("A"))
    return stat.extrema[0][0] < 250


def normalize_image(source: Path, destination: Path) -> None:
    with Image.open(source) as opened:
        image = opened.convert("RGBA")

    if max(image.size) > MAX_PROCESS_SIZE:
        ratio = MAX_PROCESS_SIZE / max(image.size)
        image = image.resize(
            (max(1, round(image.width * ratio)), max(1, round(image.height * ratio))),
            Image.Resampling.LANCZOS,
        )

    if has_real_alpha(image):
        prepared = image
    else:
        prepared = remove_connected_light_background(image)

    bbox = alpha_bbox(prepared)
    if bbox:
        content = prepared.crop(bbox)
    else:
        content = center_square_crop(prepared)

    content_ratio = content.width / max(1, content.height)
    if content_ratio < 0.48:
        max_width = int(CANVAS_SIZE * 0.48)
        max_height = int(CANVAS_SIZE * 0.78)
    elif content_ratio > 1.35:
        max_width = int(CANVAS_SIZE * 0.84)
        max_height = int(CANVAS_SIZE * 0.56)
    else:
        max_width = int(CANVAS_SIZE * 0.70)
        max_height = int(CANVAS_SIZE * 0.76)

    scale = min(max_width / content.width, max_height / content.height, 1.0)
    target = (
        max(1, round(content.width * scale)),
        max(1, round(content.height * scale)),
    )
    content = content.resize(target, Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    x = (CANVAS_SIZE - content.width) // 2
    y = int((CANVAS_SIZE - content.height) * 0.48)
    canvas.alpha_composite(content, (x, y))

    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, optimize=True)


def main() -> None:
    manifest = read_source_manifest()

    if PREVIEW_ROOT.exists():
        shutil.rmtree(PREVIEW_ROOT)

    preview_map: dict[str, str] = {}
    skipped: list[str] = []

    for key, value in sorted(manifest.items()):
        source = relative_source_path(value)
        brand, slug = key.split("/", 1)
        destination = PREVIEW_ROOT / brand / f"{slug}.png"

        try:
            normalize_image(source, destination)
        except Exception as error:
            skipped.append(f"{key}: {error}")
            continue

        preview_map[key] = f"/product-previews/{brand}/{slug}.png"

    PREVIEW_MANIFEST.write_text(
        "export const productPreviewPathMap: Record<string, string> = "
        + json.dumps(preview_map, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )

    print(f"generated {len(preview_map)} product previews")
    if skipped:
        print(f"skipped {len(skipped)} images")
        for item in skipped:
            print(item)


if __name__ == "__main__":
    main()
