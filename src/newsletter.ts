import { icon } from './icons';

/** Public form and POST action from the owner's Brevo HTML export. */
export const BREVO_FORM_URL = 'https://2b24de71.sibforms.com/v2/serve/MUIFAOTnc-fcuppGwnxbVPptwD0j1ihNQMKKeiYRICdFwAeXSV1MC4-hEgTqU5IGBtiMhrLOMLSJgRLBP8eCkrSOKumf5yMyDXyQ1R52dN6hPpu_mL_y-XHyjhJHlKSw20mgdI11N4HMC4rjNt4TMGLIi6HPkpYqGKiPTc1FVSs1nWty1DKBE9twq8brzY72ejw0CrLTJLEkXo0s5A==';
export const BREVO_FORM_ACTION = BREVO_FORM_URL.replace('/v2/serve/', '/serve/');

export function newsletterForm(): string {
  return `<form id="newsletter-form" class="newsletter-form" action="${BREVO_FORM_ACTION}" method="post" aria-label="Join the KIIERO CRUNCH early-access list" data-type="subscription">
    <label class="signup-label" for="signup-email">YOUR EMAIL. YOUR FIRST CRUNCH.</label>
    <div class="signup-row">
      <input id="signup-email" class="signup-input" name="EMAIL" type="email" autocomplete="email" inputmode="email" autocapitalize="none" spellcheck="false" placeholder="Enter your email" required aria-describedby="signup-privacy signup-status" />
      <button type="submit" class="button signup-submit"><span>I KIIERO IT</span>${icon('arrow')}</button>
    </div>
    <input type="text" name="email_address_check" value="" class="signup-honeypot" tabindex="-1" aria-hidden="true" autocomplete="off" />
    <input type="hidden" name="locale" value="es" />
    <p id="signup-status" class="signup-status" role="status" aria-live="polite" aria-atomic="true"></p>
  </form>
  <p class="form-perks">Get early access, launch drops and special offers.</p>
  <p id="signup-privacy" class="form-privacy">By signing up, you agree to receive KIIERO CRUNCH updates. Unsubscribe anytime. <button type="button" class="inline-button" data-dialog="privacy">Privacy Policy</button>.</p>
  <a class="signup-fallback" href="${BREVO_FORM_URL}" target="_blank" rel="noopener noreferrer">Having trouble? Open the signup form <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
}

/** Same FormData + ?isAjax=1 protocol used by Brevo's official form script. */
export function setupNewsletter(): void {
  const form = document.querySelector<HTMLFormElement>('#newsletter-form');
  if (!form) return;
  const email = form.querySelector<HTMLInputElement>('#signup-email')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const buttonText = button.querySelector('span')!;
  const status = form.querySelector<HTMLParagraphElement>('#signup-status')!;
  let pending = false;

  function message(text: string, state: 'pending' | 'success' | 'error', lang = 'en') {
    status.textContent = text;
    status.dataset.state = state;
    status.lang = lang;
  }

  email.addEventListener('input', () => {
    if (!pending) {
      status.textContent = '';
      delete status.dataset.state;
      email.removeAttribute('aria-invalid');
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const data = new FormData(form);
    pending = true;
    button.disabled = true;
    buttonText.textContent = 'SENDING…';
    email.readOnly = true;
    email.removeAttribute('aria-invalid');
    form.setAttribute('aria-busy', 'true');
    message('One step closer to the crunch…', 'pending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${form.action}?isAjax=1`, {
        method: 'POST', body: data, signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (!result || typeof result !== 'object') throw new Error('Unexpected provider response');
      const payload = result as { success?: unknown; message?: unknown; errors?: { EMAIL?: unknown }; redirect?: unknown };
      const providerMessage = typeof payload.message === 'string' ? payload.message.trim() : '';
      if (!response.ok || payload.success !== true) {
        const fieldError = typeof payload.errors?.EMAIL === 'string' ? payload.errors.EMAIL.trim() : '';
        if (fieldError) email.setAttribute('aria-invalid', 'true');
        message(fieldError || providerMessage || 'We couldn’t confirm your signup. Please try again or use the link below.', 'error', fieldError || providerMessage ? 'es' : 'en');
        return;
      }
      form.reset();
      message(providerMessage || 'Thanks! Your request was received. Check your inbox for any confirmation step.', 'success', providerMessage ? 'es' : 'en');
      if (typeof payload.redirect === 'string' && payload.redirect.trim()) {
        try {
          const redirect = new URL(payload.redirect, form.action);
          if (redirect.protocol === 'https:' || redirect.protocol === 'http:') window.location.assign(redirect.href);
        } catch {
          // A malformed optional redirect must not undo Brevo's acknowledgement.
        }
      }
    } catch {
      // Never infer success or automatically re-submit an ambiguous request.
      message('We couldn’t confirm your signup. Please try again or open the signup form below.', 'error');
    } finally {
      window.clearTimeout(timeout);
      pending = false;
      button.disabled = false;
      buttonText.textContent = 'I KIIERO IT';
      email.readOnly = false;
      form.removeAttribute('aria-busy');
    }
  });
}
