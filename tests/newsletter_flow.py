"""Exercise submission with intercepted Brevo responses; never adds real contacts."""

import asyncio
import json
import os
from playwright.async_api import async_playwright, expect
from browser_smoke import BREVO_FORM_ACTION, BREVO_FORM_URL

BASE_URL = os.environ.get("KIIERO_TEST_URL", "http://127.0.0.1:4173/kiiero-crunch-preview.html")


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path="/usr/bin/chromium", args=["--no-sandbox"])
        page = await browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        requests = []
        phase = "success"
        release = asyncio.Event()

        async def provider(route):
            request = route.request
            assert request.method == "POST"
            assert request.url == BREVO_FORM_ACTION + "?isAjax=1"
            requests.append(request.post_data)
            if phase == "pending":
                await release.wait()
            if phase == "network":
                await route.abort()
                return
            if phase == "unexpected":
                await route.fulfill(content_type="text/html", body="<h1>Service unavailable</h1>")
                return
            responses = {
                "success": {"success": True, "message": "Revisa tu correo para confirmar la suscripción."},
                "pending": {"success": True},
                "rejected": {"success": False, "message": "No hemos podido validar tu suscripción.", "errors": {"EMAIL": "Comprueba tu dirección de email."}},
                "http-error": {"success": True},
                "missing": {},
            }
            await route.fulfill(
                status=503 if phase == "http-error" else 200,
                content_type="application/json", body=json.dumps(responses[phase]),
                headers={"Access-Control-Allow-Origin": "*"},
            )

        # Intercept the entire provider host before any page interaction.
        await page.route("https://2b24de71.sibforms.com/**", provider)
        await page.goto(BASE_URL, wait_until="networkidle")
        await page.locator('a[href="#join"]:visible').first.click()
        email = page.locator("#signup-email")
        submit = page.locator(".signup-submit")
        status = page.locator("#signup-status")

        for value in ["", "not-an-email"]:
            await email.fill(value)
            await submit.click()
            assert not requests
            assert not await email.evaluate("el => el.checkValidity()")
        print("PASS: empty and malformed emails never reach Brevo")

        phase = "pending"
        await email.fill("qa@example.com")
        await submit.click()
        await expect(submit).to_be_disabled()
        await expect(status).to_have_attribute("data-state", "pending")
        await page.locator("#newsletter-form").dispatch_event("submit")
        await page.wait_for_timeout(100)
        assert len(requests) == 1
        assert 'name="EMAIL"\r\n\r\nqa@example.com' in requests[0]
        assert 'name="locale"\r\n\r\nes' in requests[0]
        assert 'name="email_address_check"\r\n\r\n\r\n' in requests[0]
        release.set()
        await expect(status).to_have_attribute("data-state", "success")
        await expect(submit).to_be_enabled()
        await expect(email).to_have_value("")
        print("PASS: exact multipart fields, pending state and duplicate-submit protection")

        phase = "success"
        await email.fill("qa@example.com")
        await submit.click()
        await expect(status).to_have_text("Revisa tu correo para confirmar la suscripción.")
        await expect(status).to_have_attribute("lang", "es")
        print("PASS: provider acknowledgement shown; confirmation instructions retained")

        for phase in ["rejected", "http-error", "network", "unexpected", "missing"]:
            await email.fill("qa@example.com")
            await submit.click()
            await expect(status).to_have_attribute("data-state", "error")
            await expect(email).to_have_value("qa@example.com")
            await expect(submit).to_be_enabled()
            assert await page.locator(".signup-fallback").get_attribute("href") == BREVO_FORM_URL
            if phase == "rejected":
                await expect(email).to_have_attribute("aria-invalid", "true")
                await expect(status).to_have_text("Comprueba tu dirección de email.")
        assert len(requests) == 7
        assert await page.evaluate("localStorage.length") == 0
        print("PASS: server rejection, HTTP error, network failure and invalid responses preserve email and offer fallback")
        print("NOT TESTED: production subscription or private Brevo contact list; all POSTs were intercepted")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
