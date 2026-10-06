/** Public embed supplied by the owner. Brevo handles submissions and confirmation. */
export const BREVO_FORM_URL = 'https://2b24de71.sibforms.com/v2/serve/MUIFAOTnc-fcuppGwnxbVPptwD0j1ihNQMKKeiYRICdFwAeXSV1MC4-hEgTqU5IGBtiMhrLOMLSJgRLBP8eCkrSOKumf5yMyDXyQ1R52dN6hPpu_mL_y-XHyjhJHlKSw20mgdI11N4HMC4rjNt4TMGLIi6HPkpYqGKiPTc1FVSs1nWty1DKBE9twq8brzY72ejw0CrLTJLEkXo0s5A==';

export function newsletterEmbed(): string {
  return `<div class="newsletter-embed">
    <iframe id="brevo-signup" class="brevo-frame" title="Join the KIIERO CRUNCH early-access list — Brevo signup form" width="540" height="305" src="${BREVO_FORM_URL}" loading="lazy" scrolling="auto" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>
  <p class="form-perks">Get early access, launch drops and special offers.</p>
  <p class="form-privacy">Sign up through Brevo for KIIERO CRUNCH updates. <button type="button" class="inline-button" data-dialog="privacy">Privacy Policy</button>.</p>
  <a class="signup-fallback" href="${BREVO_FORM_URL}" target="_blank" rel="noopener noreferrer">Having trouble? Open the signup form <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
}
