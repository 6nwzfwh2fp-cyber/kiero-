"""Check the actual background below the animated hero, including mid-hover frames."""

import asyncio
from io import BytesIO
import os
from pathlib import Path
from PIL import Image, ImageChops
from playwright.async_api import async_playwright

BASE_URL = os.environ.get(
    "KIIERO_TEST_URL", "http://127.0.0.1:4173/kiiero-crunch-preview.html"
)


async def check(page, width, name):
    await page.goto(BASE_URL, wait_until="networkidle")
    await page.evaluate("document.fonts.ready")
    await page.wait_for_timeout(700)
    hero = page.locator(".hero-visual")
    bounds = await hero.bounding_box()

    async def bags_bottom():
        return await page.locator(".hero-pack").evaluate_all(
            "els => Math.max(...els.map(el => el.getBoundingClientRect().bottom))"
        )

    await page.mouse.move(1, 1)
    await page.wait_for_timeout(550)
    bottom_idle = await bags_bottom()
    await hero.hover()
    await page.wait_for_timeout(550)
    bottom_hover = await bags_bottom()
    await page.mouse.move(1, 1)
    await page.wait_for_timeout(550)

    # This region contains the rings and backdrop, but no pouch in either pose.
    floor_y = max(bottom_idle, bottom_hover) + 3
    clip = {
        "x": max(0, bounds["x"]), "y": floor_y,
        "width": min(width, bounds["x"] + bounds["width"]) - max(0, bounds["x"]),
        "height": bounds["y"] + bounds["height"] - floor_y,
    }
    assert clip["height"] > 15, f"No visible background test region at {width}px"
    baseline = await page.screenshot(clip=clip)
    out = Path("/tmp/kiiero-checks")
    out.mkdir(exist_ok=True)

    # Move directly so Playwright doesn't wait for the animation before capture.
    for state, point in [
        ("enter", (bounds["x"] + bounds["width"] / 2, bounds["y"] + 100)),
        ("leave", (1, 1)),
    ]:
        await page.mouse.move(*point)
        for delay in [50, 150, 400]:
            await page.wait_for_timeout(delay)
            shot = await page.screenshot(clip=clip)
            diff = ImageChops.difference(
                Image.open(BytesIO(baseline)).convert("RGB"),
                Image.open(BytesIO(shot)).convert("RGB"),
            )
            # Allow isolated antialiasing changes on doodle strokes, but fail on
            # even a thin band or moving shadow across the otherwise fixed floor.
            changed = sum(max(pixel) > 2 for pixel in diff.get_flattened_data())
            limit = max(10, diff.width * diff.height * 0.0002)
            if changed > limit:
                (out / f"hover-{name}-floor-baseline.png").write_bytes(baseline)
                (out / f"hover-{name}-floor-changed.png").write_bytes(shot)
            assert changed <= limit, f"Background changes below bags on {state} at {width}px after {delay}ms ({changed} pixels)"
            await hero.screenshot(path=str(out / f"hover-{name}-{state}-{delay}.png"))
    assert await page.evaluate("document.documentElement.scrollWidth === innerWidth")
    print(f"PASS: {name}, unchanged backdrop on mouse entry/exit during and after animation")


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/chromium", args=["--no-sandbox"]
        )
        for width, height, scale, name in [
            (1440, 1000, 2, "desktop"),
            (1920, 1100, 2, "wide-desktop"),
            (390, 1200, 3, "mobile"),
        ]:
            page = await browser.new_page(
                viewport={"width": width, "height": height}, device_scale_factor=scale
            )
            await check(page, width, name)
            await page.close()
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
