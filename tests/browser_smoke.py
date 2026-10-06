"""Functional browser checks. Run against a running Vite server."""

import asyncio
import json
import os
from pathlib import Path
from playwright.async_api import async_playwright

BASE_URL = os.environ.get("KIIERO_TEST_URL", "http://127.0.0.1:5173")
STORAGE_KEY = "kiiero-crunch:early-access:v1"


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(
            executable_path="/usr/bin/chromium", args=["--no-sandbox"]
        )
        page = await browser.new_page(
            viewport={"width": 1440, "height": 900}, reduced_motion="reduce"
        )
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        await page.goto(BASE_URL, wait_until="networkidle")
        assert await page.title() == "KIIERO CRUNCH | Crunch Different"
        assert await page.locator("main > section").count() == 6
        assert await page.locator(".flavor-card").count() == 3
        assert await page.locator(".benefit").count() == 4

        for width in [320, 360, 375, 390, 430, 600, 768, 900, 1024, 1440, 1920]:
            await page.set_viewport_size({"width": width, "height": 900})
            assert await page.evaluate(
                "document.documentElement.scrollWidth === innerWidth"
            ), f"Horizontal overflow at {width}px"
            offscreen = await page.locator(
                "h1,h2,h3,input,.button,.flavor-card"
            ).evaluate_all(
                "els => els.filter(el => { const r = el.getBoundingClientRect();"
                "return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);"
                "}).map(el => el.className)"
            )
            assert not offscreen, f"Clipped content at {width}px: {offscreen}"
        print("PASS: 11 responsive viewports, all sections and flavor cards")

        await page.set_viewport_size({"width": 390, "height": 844})
        await page.locator(".menu-toggle").click()
        assert await page.locator("#mobile-nav").is_visible()
        assert await page.locator(".menu-toggle").get_attribute("aria-expanded") == "true"
        await page.locator('#mobile-nav a[href="#flavors"]').click()
        assert await page.evaluate("location.hash") == "#flavors"
        assert not await page.locator("#mobile-nav").is_visible()
        await page.locator(".menu-toggle").click()
        await page.keyboard.press("Escape")
        assert not await page.locator("#mobile-nav").is_visible()
        print("PASS: mobile menu, anchor navigation and Escape handling")

        await page.locator('.flavor-card a[href="#join"]').first.click()
        assert await page.evaluate("location.hash") == "#join"
        assert await page.locator("#email").is_visible()
        submit = page.locator('#newsletter-form button[type="submit"]')
        await page.locator("#email").fill("not-an-email")
        await submit.click()
        assert await page.locator("#email").get_attribute("aria-invalid") == "true"
        assert "needs a little fix" in await page.locator("#form-message").inner_text()
        await page.locator("#email").fill("Snack.Fan@Example.com")
        await submit.click()
        assert "Bring on the crunch" in await page.locator("#form-message").inner_text()
        saved = await page.evaluate(f"JSON.parse(localStorage.getItem('{STORAGE_KEY}'))")
        assert len(saved) == 1 and saved[0]["email"] == "snack.fan@example.com"
        assert saved[0]["joinedAt"]
        await page.reload(wait_until="networkidle")
        await page.locator("#email").fill("snack.fan@example.com")
        await submit.click()
        assert "already on this device" in await page.locator("#form-message").inner_text()
        assert await page.evaluate(f"JSON.parse(localStorage.getItem('{STORAGE_KEY}')).length") == 1
        await page.evaluate("() => { Storage.prototype.setItem = () => { throw new Error('blocked') }; }")
        await page.locator("#email").fill("another@example.com")
        await submit.click()
        assert "couldn’t save" in await page.locator("#form-message").inner_text()
        assert await submit.is_enabled()
        print("PASS: email validation, normalization, persistence, deduplication and storage denial")

        await page.locator('.footer-links [data-dialog="privacy"]').click()
        assert await page.locator("dialog").is_visible()
        assert "YOUR EMAIL" in await page.locator("#dialog-title").inner_text()
        await page.keyboard.press("Escape")
        assert not await page.locator("dialog").is_visible()
        for dialog_id in ["terms", "contact", "instagram", "tiktok"]:
            await page.locator(f'[data-dialog="{dialog_id}"]:visible').first.click()
            assert await page.locator("dialog").is_visible()
            await page.locator(".dialog-done").click()
            assert not await page.locator("dialog").is_visible()
        print("PASS: all five placeholder dialogs and keyboard closing")

        assert await page.locator(".marquee-track").evaluate(
            "el => getComputedStyle(el).animationName"
        ) == "none"
        assert not errors, f"Browser errors: {errors}"
        print("PASS: reduced-motion preference and no JavaScript errors")

        axe_path = Path("/tmp/kiiero-audit/node_modules/axe-core/axe.min.js")
        if axe_path.exists():
            await page.reload(wait_until="networkidle")
            await page.add_script_tag(path=str(axe_path))
            audit = await page.evaluate("async () => await axe.run(document)")
            violations = [
                {"id": item["id"], "impact": item["impact"], "nodes": [node["target"] for node in item["nodes"]]}
                for item in audit["violations"]
            ]
            assert not violations, json.dumps(violations, indent=2)
            print(f"PASS: axe accessibility audit ({len(audit['passes'])} rules passed)")

        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.goto(BASE_URL, wait_until="networkidle")
        Path("/tmp/kiiero-checks").mkdir(exist_ok=True)
        await page.screenshot(path="/tmp/kiiero-checks/desktop.png", full_page=True)
        await page.set_viewport_size({"width": 390, "height": 844})
        await page.screenshot(path="/tmp/kiiero-checks/mobile.png", full_page=True)
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
