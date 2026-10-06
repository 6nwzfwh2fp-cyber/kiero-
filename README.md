# KIIERO CRUNCH

A mobile-first, pre-launch homepage for KIIERO CRUNCH. Built with TypeScript and Vite, without a UI framework or runtime animation dependencies.

## Develop

Requires Node.js 22.12+ (Node 24 is supported).

```sh
cd /workspace/kiero-
npm ci --cache /tmp/kiiero-npm-cache --no-audit --no-fund
npm run dev
```

Vite binds to all interfaces on port **5173**. No environment variables or private credentials are required. The newsletter form loads from Brevo's public embed and requires Internet access to the configured `sibforms.com` host.

```sh
npm run build       # Strict TypeScript checking and optimized production assets
npm run preview     # Serve the production build on port 4173
npm run export:preview # Generate the single-file homepage (Brevo requires Internet)
```

The existing checkout is already isolated. Do not create an additional Git worktree for normal cloud tasks.

## Organization

- `src/main.ts`: reusable section helpers, rendering, navigation, dialogs and scroll enhancement.
- `src/catalog.ts`: typed flavor data. Every flavor has `coming-soon` availability.
- `src/art.ts`: original SVG pouch concepts and ingredient illustrations.
- `src/newsletter.ts`: owner-provided public Brevo form URL and reusable iframe markup.
- `src/style.css`: responsive styles, hover effects and reduced-motion support.
- `public/`: favicon and social sharing artwork.

The homepage typography and illustrations are bundled locally. The Brevo iframe independently loads its provider-managed resources. Decorative SVGs are hidden from assistive technology; product pouches have descriptive labels.

The standalone HTML preview includes homepage scripts, styles, illustrations and fonts in one file. Open it in a modern browser to explore the homepage without a development server. Newsletter signup still requires access to Brevo; it is not an offline form.

## Brevo newsletter

The Join the List section embeds the official Brevo form supplied by the owner, using its exact public URL in `src/newsletter.ts`. The iframe is responsive, labeled for assistive technology, and scrollable at the supplied 305px height. A direct link opens the same form in a new tab if embedding is blocked. All existing page CTAs scroll to this section.

Brevo handles the form fields, validation, submission, confirmation, contact list and opt-in settings. No API keys are exposed or required. The homepage no longer stores signup emails in localStorage or generates its own success message. Earlier local browser entries are left untouched and are not automatically transferred to Brevo.

Edit fields, the submission button's copy, internal form colors and target contact list in Brevo's form editor. The homepage retains its charcoal background, typography, section heading, accents and surrounding layout; cross-origin iframe contents are styled by Brevo.

To verify the complete flow, submit an email you control through the published page, complete any confirmation step, and check the form's assigned list in Brevo → Contacts. Automated tests do not add fabricated subscribers to the live list. The private contact list cannot be verified from the public embed alone.

Cloud validation needs network access to `2b24de71.sibforms.com` and `sibforms.com`; the saved network draft includes both hosts. Saving the draft does not apply it to the running machine. If the cloud proxy blocks the iframe, apply the network changes in environment settings before live validation. This cloud restriction does not configure visitors' browser access.

GitHub Pages serves the self-contained build on the `gh-pages` branch at https://6nwzfwh2fp-cyber.github.io/kiero-/. Source changes are saved on `main`. Publication should preserve the current `gh-pages` history and use a regular push, never a force push.

## Future commerce

Flavor records have stable IDs and an optional `commerceId` for a future Shopify/product adapter. Add product details, confirmed ingredients and sizes, live inventory, and a checkout integration as a separate feature. There are currently no payments, checkout links or purchase controls.

## Launch placeholders

Pouches and their 1.7 oz sizes are design concepts. Flavor ingredients remain provisional. The third hero pouch says **NEW FLAVOR / COMING SOON**, and its card says **MYSTERY FLAVOR**. Social buttons display an honest coming-soon dialog until official profile URLs are supplied. Footer links display pre-launch notices; these are not finalized legal policies. No unverified nutrition or certification claims are made.

The reference image was not available in the conversation when this version was built; artwork follows the written brand direction.

## Browser checks

With Python Playwright and Chromium installed, while the development server runs:

```sh
python3 tests/browser_smoke.py
```

These checks exercise responsive layouts, mobile navigation, anchors, the exact Brevo embed URL, iframe accessibility and containment, the direct-form fallback, absence of local signup storage, privacy copy, dialogs and reduced-motion behavior. They do not validate Brevo's private contact list or submit production subscriptions. Browser tooling is a development-only environment dependency.
