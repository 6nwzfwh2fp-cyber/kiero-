# KIIERO CRUNCH

A mobile-first, pre-launch homepage for KIIERO CRUNCH. Built with TypeScript and Vite, without a UI framework or runtime animation dependencies.

## Develop

Requires Node.js 22.12+ (Node 24 is supported).

```sh
cd /workspace/kiero-
npm ci --cache /tmp/kiiero-npm-cache --no-audit --no-fund
npm run dev
```

Vite binds to all interfaces on port **5173**. No environment variables or private credentials are required. Newsletter submissions require Internet access to the public Brevo form endpoint at `2b24de71.sibforms.com`.

```sh
npm run build       # Strict TypeScript checking and optimized production assets
npm run preview     # Serve the production build on port 4173
npm run export:preview # Generate the single-file homepage (Brevo requires Internet)
```

The existing checkout is already isolated. Do not create an additional Git worktree for normal cloud tasks.

## Organization

- `src/main.ts`: reusable section helpers, rendering, navigation, dialogs and scroll enhancement.
- `src/catalog.ts`: typed flavor data. Every flavor has `coming-soon` availability.
- `src/art.ts`: accessible product sprite views and SVG ingredient illustrations.
- `src/newsletter.ts`: reusable branded form, owner-provided Brevo POST action and submission handling.
- `src/style.css`: responsive styles, hover effects and reduced-motion support.
- `public/`: favicon, social sharing artwork and the optimized six-pouch WebP sprite.

The homepage typography, illustrations and signup form are bundled locally. There is no embedded signup iframe or third-party form styling/script dependency. Decorative SVGs are hidden from assistive technology; product pouches have descriptive labels.

The standalone HTML preview includes homepage scripts, styles, illustrations and fonts in one file. Open it in a modern browser to explore the homepage without a development server. Newsletter signup still requires access to Brevo; it is not an offline form.

## Brevo newsletter

The Join the List section uses a native HTML form styled with KIIERO's charcoal background, local fonts and yellow I KIIERO IT button. There is no nested scrolling or duplicate Newsletter heading. The action is the exact `/serve/` endpoint from the owner's full Brevo HTML export. It preserves `EMAIL`, the empty `email_address_check` honeypot and `locale=es`. The input uses email validation, autocomplete, an accessible label and mobile-friendly text sizing. All signup CTAs scroll to this section.

Submission uses the same multipart FormData POST and `?isAjax=1` protocol as Brevo's official form script, without importing its large script or styles. It prevents duplicate submissions, displays a pending state and waits for an HTTP-successful JSON response with `success: true` before showing an acknowledgement. Brevo's confirmation message and optional HTTP(S) redirect are respected. Provider field errors, network failure, timeout, HTTP failure or unexpected responses preserve the entered email, restore the button and offer the direct hosted-form link. Requests are not automatically retried. The native form action also remains valid independently of the async handler.

Brevo controls contact-list assignment and opt-in settings. No API keys are exposed or required, and signup emails are not stored in localStorage. Earlier local entries are not automatically transferred. The UI lives in `src/newsletter.ts` and `src/style.css`; changes to Brevo's configured fields or captcha requirements require an updated HTML export and adapter review. The supplied export has no captcha or additional required fields.

To verify the complete flow, submit an email you control through the published page, complete any confirmation step, and check the form's assigned list in Brevo → Contacts. Automated tests do not add fabricated subscribers to the live list. The private contact list cannot be verified from the public embed alone.

Cloud validation needs network access to `2b24de71.sibforms.com`; `sibforms.com` also hosts Brevo's official script used as a protocol reference. The saved network draft includes both hosts. The provider's read-only response allowed the published GitHub Pages origin via CORS during validation. This does not verify a production submission or the private list. Never bypass TLS or submit fabricated contacts to troubleshoot connectivity.

GitHub Pages serves the self-contained build on the `gh-pages` branch at https://6nwzfwh2fp-cyber.github.io/kiero-/. Source changes are saved on `main`. Publication should preserve the current `gh-pages` history and use a regular push, never a force push.

## Future commerce

Flavor records have stable IDs and an optional `commerceId` for a future Shopify/product adapter. Add product details, confirmed ingredients and sizes, live inventory, and a checkout integration as a separate feature. There are currently no payments, checkout links or purchase controls.

## Launch placeholders

The six flavors are mango, strawberry (fresa), blueberry (arándano), banana, kiwi and tomato (tomate). The reference-derived black pouches retain the ingredient illustrations and product windows, with visible **KIIERO CRUNCH** branding. Their artwork was adapted with image generation to remove the source reference's certification/nutrition badges and weights. Packaging and final ingredients remain concepts; no weights, organic certification, vegan/gluten-free or other unconfirmed claims are displayed. All six products are Coming Soon, with no buying controls.

One transparent 1536×1024 WebP sprite contains all six bags. SVG viewports display each complete pouch without separate image downloads. The development/standard production build caches the shared image; the single-file exporter embeds it once so GitHub Pages needs no additional product-image request. Source reference image generation output remains outside the checkout, and only the optimized web asset is committed.

Social buttons display an honest coming-soon dialog until official profile URLs are supplied. Footer legal links show launch notices and signup privacy information.

## Browser checks

With Python Playwright and Chromium installed, while the development server runs:

```sh
python3 tests/browser_smoke.py
```

These checks exercise responsive layouts, mobile navigation, anchors, the exact Brevo POST action and required fields, form accessibility and containment, the direct-form fallback, absence of local signup storage, privacy copy, dialogs and reduced-motion behavior. They do not validate Brevo's private contact list or submit production subscriptions. Browser tooling is a development-only environment dependency.

`python3 tests/newsletter_flow.py` targets the exported production page on port 4173. It intercepts every request to the provider host, tests invalid emails, pending and duplicate-submit states, multipart fields, provider acknowledgement, rejection, HTTP/network failures and unexpected responses. All subscription responses are simulated; no real contacts are created. Set `KIIERO_TEST_URL` to test another local build.

With Pillow also installed, `python3 tests/hover_visual.py` checks the exported production page on port 4173. It compares the visible background below the hero bags during mouse entry and exit, including intermediate animation frames, at desktop and mobile sizes. Moving hero bags use no CSS shadow filter, avoiding rectangular filter clipping during compositing.
