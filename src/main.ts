import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/permanent-marker/latin-400.css';
import './style.css';
import { flavors } from './catalog';
import { pouch, fruit, burst, benefitArt } from './art';
import { icon } from './icons';
import { newsletterEmbed } from './newsletter';

const logo = (className = '') => `<a class="wordmark ${className}" href="#home" aria-label="KIIERO CRUNCH home"><span>KIIERO<span class="logo-dot" aria-hidden="true">✷</span></span><span>CRUNCH</span></a>`;
const socialButtons = () => `<button class="social-button" data-dialog="instagram" aria-label="Instagram — coming soon">${icon('instagram')}</button><button class="social-button" data-dialog="tiktok" aria-label="TikTok — coming soon">${icon('tiktok')}</button>`;
const cta = (label = 'JOIN THE LIST', className = '') => `<a class="button ${className}" href="#join">${label}${icon('arrow')}</a>`;
const kindForIndex = (index: number): 'tropical' | 'spicy' | 'mystery' => (['tropical', 'spicy', 'mystery'] as const)[index];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="header">
    <div class="header-inner container">
      ${logo()}
      <nav class="desktop-nav" aria-label="Main navigation">
        <a class="nav-link active" href="#home">HOME</a>
        <a class="nav-link" href="#story">OUR STORY</a>
        <a class="nav-link" href="#flavors">FLAVORS</a>
        <a class="nav-link" href="#join">JOIN THE LIST</a>
      </nav>
      <div class="header-actions"><div class="header-socials">${socialButtons()}</div>${cta('JOIN THE LIST', 'button-small')}<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button></div>
    </div>
    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden>
      <a href="#home">HOME ${icon('arrow')}</a><a href="#story">OUR STORY ${icon('arrow')}</a><a href="#flavors">FLAVORS ${icon('arrow')}</a><a href="#join">JOIN THE LIST ${icon('arrow')}</a>
      <div class="mobile-socials">${socialButtons()}<span>GOOD THINGS ARE COMING.</span></div>
    </nav>
  </header>
  <main id="main">
    <section id="home" class="hero container">
      <div class="hero-copy">
        <div class="eyebrow hero-eyebrow"><span class="status-dot"></span> SMALL BAG. BIG MAIN CHARACTER ENERGY.</div>
        <h1>KIIERO<br>CRUNCH<span class="title-star" aria-hidden="true">✷</span></h1>
        <p class="hero-slogan marker">CRUNCH DIFFERENT.</p>
        <p class="hero-description">Real ingredients.<br class="mobile-break"> Unreal crunch.</p>
        ${cta()}
        <p class="cta-note">Be the first to taste the crunch.</p>
      </div>
      <div class="hero-visual">
        <div class="hero-ring ring-one"></div><div class="hero-ring ring-two"></div>
        <div class="hero-doodle hero-pineapple">${fruit('tropical')}</div>
        <div class="hero-doodle hero-pepper">${fruit('spicy')}</div>
        <div class="little-stars" aria-hidden="true">✧<span>✷</span></div>
        <div class="hero-packs">
          <div class="hero-pack pack-spicy">${pouch('spicy')}</div>
          <div class="hero-pack pack-mystery">${pouch('mystery')}</div>
          <div class="hero-pack pack-tropical">${pouch('tropical')}</div>
        </div>
        <div class="crunch-stamp"><span>NOT YOUR</span><strong>AVERAGE<br>SNACK.</strong><span>AND THAT'S THE POINT.</span></div>
        <div class="hero-caption"><span class="caption-arrow" aria-hidden="true">↳</span> your snack drawer<br> is about to get interesting.</div>
        <p class="pack-note">PACKAGING CONCEPTS · FLAVORS IN DEVELOPMENT</p>
      </div>
      <a class="scroll-cue" href="#flavors"><span>MEET YOUR NEXT OBSESSION</span><span aria-hidden="true">↓</span></a>
    </section>

    <div class="marquee" role="img" aria-label="Real ingredients. Bold flavors. Unreal crunch. Freeze-dried.">
      <div class="marquee-track" aria-hidden="true">${Array.from({ length: 4 }, () => '<span>REAL INGREDIENTS</span><span class="marquee-star">✷</span><span>BOLD FLAVORS</span><span class="marquee-star">✷</span><span>UNREAL CRUNCH</span><span class="marquee-star">✷</span><span>FREEZE-DRIED</span><span class="marquee-star">✷</span>').join('')}</div>
    </div>

    <section id="flavors" class="flavors-section container section-space">
      <div class="section-heading reveal">
        <div><p class="eyebrow">THREE BAGS. ZERO BORING.</p><h2>PICK YOUR <span class="marker heading-mark">CRUNCH.</span></h2></div>
        <p class="section-intro">Big personalities. Unexpected combinations.<br>Your usual snacks could never.</p>
      </div>
      <div class="flavor-grid">
        ${flavors.map((flavor, index) => `<article class="flavor-card reveal" style="--flavor-color:${flavor.color};--delay:${index * 90}ms">
          <div class="flavor-visual flavor-${kindForIndex(index)}">
            <div class="card-topline"><span>0${index + 1} / ${flavor.label}</span><span class="card-orbit" aria-hidden="true">✷</span></div>
            <span class="flavor-background-word" aria-hidden="true">${['TROPICAL', 'FIRE.', '???'][index]}</span>
            <div class="card-fruit">${fruit(kindForIndex(index))}</div>
            ${pouch(kindForIndex(index), 'card-pouch')}
            <span class="coming-tag">COMING SOON</span>
          </div>
          <div class="flavor-content">
            <p class="eyebrow flavor-category">${flavor.category}</p>
            <h3 class="marker">${flavor.name}</h3>
            <p class="flavor-description">${flavor.description}</p>
            <p class="flavor-ingredients">${flavor.ingredients}</p>
            <a class="card-link" href="#join">${index === 2 ? 'KEEP ME IN THE LOOP' : 'I WANT FIRST DIBS'} ${icon('arrow')}</a>
          </div>
        </article>`).join('')}
      </div>
      <p class="flavors-footnote">A sneak peek at what we’re cooking up. Final ingredients and packaging will be announced at launch.</p>
    </section>

    <section class="why-section section-space">
      <div class="container">
        <div class="why-heading reveal"><p class="eyebrow">A DIFFERENT KIND OF SNACK ATTACK.</p><h2>WHY KIIERO CRUNCH?</h2><p>Familiar ingredients. A wildly different experience.</p></div>
        <div class="benefits">
          ${[
            ['ingredients', 'REAL INGREDIENTS', 'The familiar stuff.<br>With a whole new attitude.', 'yellow'],
            ['dried', 'FREEZE-DRIED', 'Low temps. Big transformation.<br>A whole new texture.', 'purple'],
            ['crunch', 'BIG CRUNCH', 'Light. Crispy. Loud.<br>Go ahead, make some noise.', 'coral'],
            ['flavors', 'BOLD FLAVORS', 'Sweet, spicy, unexpected.<br>Anything but ordinary.', 'green'],
          ].map(([art, title, description, color], index) => `<div class="benefit reveal" style="--delay:${index * 70}ms"><div class="benefit-icon ${color}">${benefitArt(art)}</div><h3>${title}</h3><p>${description}</p></div>`).join('')}
        </div>
      </div>
    </section>

    <section id="story" class="story-section">
      <div class="container story-inner">
        <div class="story-art reveal" aria-hidden="true">
          <span class="story-curved">A LITTLE WEIRD. A LOT OF WOW.</span>
          <div class="story-burst">${burst}<div>SNACK<br><span class="marker">outside</span><br>THE BOX.</div></div>
          <div class="story-fruit">${fruit('tropical')}</div>
          <span class="story-spark">✷</span><span class="story-signature marker">made for the<br>“one more bite” people.</span>
        </div>
        <div class="story-copy reveal">
          <p class="eyebrow">SAME PLANET. DIFFERENT SNACK.</p>
          <h2>WE DON'T DO<br>BORING SNACKS<span class="story-period">.</span></h2>
          <p>We take ingredients you know and give them a plot twist. A little freeze-drying. A little flavor rebellion. A whole lot of crunch.</p>
          <p>Born in Miami. Made for curious mouths.<br>Because life’s too short for a forgettable snack.</p>
          <a class="text-link" href="#join">WELCOME TO THE CRUNCH CLUB ${icon('arrow')}</a>
        </div>
      </div>
    </section>

    <section id="join" class="join-section container section-space">
      <div class="join-copy reveal">
        <p class="eyebrow"><span class="status-dot"></span> YOU'RE EARLY. WE LIKE THAT.</p>
        <h2>WANT THE<br>FIRST <span class="marker">CRUNCH?</span></h2>
        <p>The good stuff is coming.<br>Get on the list. Get in on the crunch.</p>
      </div>
      <div class="join-form-wrap reveal">
        <div class="form-note marker">good taste. great timing. <span aria-hidden="true">↴</span></div>
        ${newsletterEmbed()}
        <div class="join-bottom"><span class="join-tiny-star" aria-hidden="true">✷</span><span>NO BORING SNACKS.<br>NO BORING INBOX.</span></div>
      </div>
    </section>

    <section class="closing-section">
      <div class="container closing-inner reveal">
        <p class="eyebrow">YOUR NEXT SNACK OBSESSION IS ALMOST HERE.</p>
        <div class="closing-wordmark"><span>KIIERO</span><span>CRUNCH<span class="closing-star" aria-hidden="true">✷</span></span></div>
        <div class="closing-details"><span class="coming-soon-label"><span class="status-dot"></span> COMING SOON</span><p class="marker">CRUNCH DIFFERENT.</p><div class="closing-socials"><button data-dialog="instagram">${icon('instagram')} Instagram ${icon('arrow')}</button><button data-dialog="tiktok">${icon('tiktok')} TikTok ${icon('arrow')}</button></div></div>
      </div>
    </section>
  </main>
  <footer class="footer container">
    <div class="footer-brand">${logo()}<span>MIAMI, FLORIDA<br><span class="copyright">© 2026 KIIERO CRUNCH</span></span></div>
    <div class="footer-links"><button data-dialog="privacy">Privacy Policy</button><button data-dialog="terms">Terms</button><button data-dialog="contact">Contact ${icon('arrow')}</button></div>
    <a class="back-top" href="#home" aria-label="Back to top">↑</a>
  </footer>
  <dialog class="info-dialog" aria-labelledby="dialog-title"><div class="dialog-inner"><button class="dialog-close" aria-label="Close dialog">${icon('close')}</button><span class="dialog-star" aria-hidden="true">✷</span><p class="eyebrow">KIIERO CRUNCH</p><h2 id="dialog-title"></h2><div id="dialog-content"></div><button class="button dialog-done">GOT IT ${icon('check')}</button></div></dialog>
`;

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav')!;
const setMenuOpen = (open: boolean) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.innerHTML = icon(open ? 'close' : 'menu');
  mobileNav.hidden = !open;
};
menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !mobileNav.hidden) { setMenuOpen(false); menuButton.focus(); } });
window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => { if (event.matches) setMenuOpen(false); });

const dialog = document.querySelector<HTMLDialogElement>('.info-dialog')!;
const dialogCopy: Record<string, [string, string]> = {
  privacy: ['YOUR EMAIL. YOUR CALL.', '<p>When you submit the signup form, your email and any information you enter are sent directly to Brevo, our signup and contact management provider, for the KIIERO CRUNCH early-access list.</p><p>We use the list for launch updates, product news and special offers. If the form requests email confirmation, complete that step to finish subscribing. Marketing emails include an unsubscribe link.</p><p>This site does not save new signups in your browser’s local storage. <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer">Read Brevo’s privacy policy (opens in a new tab).</a></p>'],
  terms: ['THE FINE PRINT. SOON.', '<p>KIIERO CRUNCH is coming soon. The products, flavor combinations and packaging shown here are concepts in development. Final ingredients, sizes and product information will be confirmed at launch.</p><p>Nothing is currently available to buy. Official terms will be published before ordering opens.</p>'],
  contact: ['LET’S TALK CRUNCH.', '<p>We’re getting our contact channels ready. Our official contact details will appear here before launch.</p><p>For now, join the early-access list and keep an eye on this space.</p>'],
  instagram: ['FEED YOUR CURIOSITY.', '<p>Our official Instagram is coming soon. We’ll add the verified profile here when it’s ready.</p><p>Until then, join the list for your first taste of KIIERO CRUNCH.</p>'],
  tiktok: ['SOUND ON. CRUNCH UP.', '<p>Our official TikTok is coming soon. We’ll add the verified profile here when it’s ready.</p><p>The crunch deserves its own soundtrack. Stay tuned.</p>'],
};
document.querySelectorAll<HTMLButtonElement>('[data-dialog]').forEach((button) => button.addEventListener('click', () => {
  const [title, content] = dialogCopy[button.dataset.dialog!];
  document.querySelector('#dialog-title')!.textContent = title;
  document.querySelector('#dialog-content')!.innerHTML = content;
  dialog.showModal();
}));
dialog.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });

// Progressive enhancement: content stays visible if observers are unavailable.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => { element.classList.add('will-reveal'); revealObserver.observe(element); });
}

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) document.querySelectorAll('.desktop-nav a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-20% 0px -60% 0px' });
document.querySelectorAll('main > section[id]').forEach((section) => navObserver.observe(section));
