const paths: Record<string, string> = {
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  tiktok: '<path d="M14 3v12a4 4 0 1 1-4-4m4-8c0 4 3 6 6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  menu: '<path d="M4 7h16M4 17h16"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
};
export const icon = (name: string, className = '') => `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
