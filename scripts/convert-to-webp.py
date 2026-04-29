#!/usr/bin/env python3
"""Convert all PNG/JPG images in public/images/ to WebP and report savings."""

import os
from pathlib import Path
from PIL import Image

IMAGES_DIR = Path(__file__).parent.parent / "public" / "images"
QUALITY = 82  # Good balance: sharp details, much smaller files

total_before = 0
total_after = 0
converted = []
skipped = []

for src in sorted(IMAGES_DIR.iterdir()):
    if src.suffix.lower() not in (".png", ".jpg", ".jpeg"):
        continue

    # Skip favicon and OG image — keep as original format for compatibility
    if src.name in ("1hRsNKptBLZtKNXyJUYY761rLinAjasHx.png", "1edubEGyyDC158dQ_HJEuON5T7mruaart.jpg"):
        skipped.append(src.name)
        continue

    dest = src.with_suffix(".webp")

    try:
        img = Image.open(src)
        # Preserve RGBA (transparency) for PNGs
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")

        img.save(dest, "webp", quality=QUALITY, method=6)

        size_before = src.stat().st_size
        size_after = dest.stat().st_size
        total_before += size_before
        total_after += size_after
        saving_pct = (1 - size_after / size_before) * 100
        converted.append((src.name, size_before, size_after, saving_pct))
        print(f"  {src.name:50s} {size_before//1024:5d}KB -> {size_after//1024:4d}KB  ({saving_pct:.0f}% smaller)")
    except Exception as e:
        print(f"  ERROR {src.name}: {e}")

print()
print(f"Converted {len(converted)} images")
print(f"Total before: {total_before // 1024 // 1024:.1f} MB")
print(f"Total after:  {total_after // 1024 // 1024:.1f} MB")
if total_before > 0:
    print(f"Total saving: {(1 - total_after/total_before)*100:.0f}%  ({(total_before-total_after)//1024//1024:.1f} MB saved)")
print(f"Skipped (kept as-is): {', '.join(skipped)}")
