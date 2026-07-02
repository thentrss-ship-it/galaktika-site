from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WORDMARK = "ГАЛАКТИКА"
PALETTE = ((34, 211, 238), (139, 92, 246))


def find_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        Path("C:/Windows/Fonts/seguisb.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf"),
    )
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def build_word_mask(font: ImageFont.FreeTypeFont | ImageFont.ImageFont) -> Image.Image:
    measuring = Image.new("L", (8, 8), 0)
    measure_draw = ImageDraw.Draw(measuring)
    box = measure_draw.textbbox((0, 0), WORDMARK, font=font)
    width = box[2] - box[0]
    height = box[3] - box[1]
    padding = max(10, round(height * 0.3))
    mask = Image.new("L", (width + padding * 2, height + padding * 2), 0)
    draw = ImageDraw.Draw(mask)
    draw.text((padding - box[0], padding - box[1]), WORDMARK, font=font, fill=255)
    return mask.rotate(-16, resample=Image.Resampling.BICUBIC, expand=True, fillcolor=0)


def colored_stamp(mask: Image.Image, color: tuple[int, int, int], opacity: float) -> Image.Image:
    stamp = Image.new("RGBA", mask.size, (*color, 0))
    stamp.putalpha(mask.point(lambda value: round(value * opacity)))
    return stamp


def apply_galaktika_pattern(product: Image.Image, opacity: float = 0.105) -> Image.Image:
    width, height = product.size
    font_size = max(34, round(width * 0.037))
    mask = build_word_mask(find_font(font_size))
    x_step = mask.width + round(width * 0.075)
    y_step = max(round(mask.height * 1.04), round(height * 0.095))
    result = product.copy().convert("RGBA")

    row = 0
    y = -mask.height
    while y < height + mask.height:
        offset = -(x_step // 2) if row % 2 else -round(mask.width * 0.15)
        column = 0
        x = offset
        while x < width + mask.width:
            color = PALETTE[(row + column) % len(PALETTE)]
            stamp = colored_stamp(mask, color, max(0.07, min(opacity, 0.16)))
            result.alpha_composite(stamp, (x, y))
            x += x_step
            column += 1
        y += y_step
        row += 1

    return result
