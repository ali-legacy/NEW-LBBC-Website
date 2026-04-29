#!/usr/bin/env python3
"""
Replace .png/.jpg image references with .webp equivalents in source files,
and add loading="lazy" to non-critical images.
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Files where image extensions need updating
SOURCE_FILES = [
    "src/components/About.tsx",
    "src/components/Footer.tsx",
    "src/components/Hero.tsx",
    "src/components/HomeComponents.tsx",
    "src/components/Navbar.tsx",
    "src/data/news.ts",
    "src/pages/AboutPage.tsx",
    "src/pages/ComingSoonPage.tsx",
    "src/pages/ContactPage.tsx",
    "src/pages/DirectoryPage.tsx",
    "src/pages/EventsPage.tsx",
    "src/pages/MembershipPage.tsx",
    "src/pages/ResourcesPage.tsx",
    "src/pages/SpotlightPage.tsx",
]

# Keep these as original format (favicon stays .png, OG image stays .jpg)
KEEP_ORIGINAL = {
    "1hRsNKptBLZtKNXyJUYY761rLinAjasHx.png",
    "1edubEGyyDC158dQ_HJEuON5T7mruaart.jpg",
    # WebP slightly larger than PNG for this one
    "1WITAc3xTAWHEMWnfMZXvr8HR3beKE-S2.png",
}

def convert_extensions(text):
    """Replace /images/filename.png and .jpg/.jpeg with .webp (except kept files)."""
    def replacer(m):
        filename = m.group(1)
        if filename in KEEP_ORIGINAL:
            return m.group(0)  # keep as-is
        stem = re.sub(r'\.(png|jpg|jpeg)$', '', filename, flags=re.IGNORECASE)
        return f"/images/{stem}.webp"
    return re.sub(r'/images/([\w\-._]+\.(?:png|jpg|jpeg))', replacer, text)

total_files_changed = 0

for rel_path in SOURCE_FILES:
    path = ROOT / rel_path
    original = path.read_text()
    updated = convert_extensions(original)
    if updated != original:
        path.write_text(updated)
        total_files_changed += 1
        print(f"  Updated: {rel_path}")

print(f"\nDone — {total_files_changed} files updated.")
