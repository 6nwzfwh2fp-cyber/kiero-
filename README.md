# KIIERO CRUNCH

A mobile-first, pre-launch homepage for KIIERO CRUNCH. Built with TypeScript and Vite, without a UI framework or runtime animation dependencies.

## Develop

Requires Node.js 22.12+ (Node 24 is supported).

```sh
cd /workspace/kiero-
npm ci --cache /tmp/kiiero-npm-cache --no-audit --no-fund
npm run dev
```

Vite binds to all interfaces on port **5173**. Use the environment's preview for that port. No environment variables, credentials or external services are required.

```sh
npm run build       # Strict TypeScript checking and optimized production assets
npm run preview     # Serve the production build on port 4173
npm run export:preview # Generate dist/kiiero-crunch-preview.html for offline use
```

The existing checkout is already isolated. Do not create an additional Git worktree for normal cloud tasks.

## Organization

- `src/main.ts`: reusable section helpers, rendering, navigation, dialogs and scroll enhancement.
- `src/catalog.ts`: typed flavor data. Every flavor has `coming-soon` availability.
- `src/art.ts`: original SVG pouch concepts and ingredient illustrations.
- `src/newsletter.ts`: signup storage adapter, email normalization and deduplication.
- `src/style.css`: responsive styles, hover effects and reduced-motion support.
- `public/`: favicon and social sharing artwork.

Typography is bundled locally. There are no remote font or image requests. Decorative SVGs are hidden from assistive technology; product pouches have descriptive labels.

The standalone HTML preview includes scripts, styles, illustrations and fonts in one file. Open it directly in a modern browser to explore the homepage without a development server. Signup storage remains local to that browser; some browsers restrict local storage on `file:` URLs and will display the form's storage error message.

## Newsletter preview

The form validates addresses and stores `{ email, joinedAt }` in this browser's local storage under `kiiero-crunch:early-access:v1`. Duplicate addresses are not added twice. Storage failures are reported to the visitor. No subscription is transmitted to a server and no email is sent. This limitation is disclosed beside the form.

Replace `joinEarlyAccess` with a server-backed email provider adapter when available. Keep provider secrets on the server, rate-limit submissions, and publish a complete privacy policy before collecting live subscriptions. Local browser entries do not automatically migrate to a mailing provider.

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

These checks exercise responsive layouts, mobile navigation, anchors, signup validation/deduplication/persistence, storage-denied behavior, dialogs and reduced-motion behavior. Browser tooling is a development-only environment dependency.
