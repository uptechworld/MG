(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('mg-theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  const themeButton = document.querySelector('[data-theme-toggle]');
  const updateThemeLabel = () => {
    if (!themeButton) return;
    const effectiveDark = root.getAttribute('data-theme') === 'dark' || (!root.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    themeButton.textContent = effectiveDark ? '☀︎' : '☾';
    themeButton.setAttribute('aria-label', effectiveDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.title = effectiveDark ? 'Switch to light theme' : 'Switch to dark theme';
  };
  updateThemeLabel();
  themeButton?.addEventListener('click', () => {
    const effectiveDark = root.getAttribute('data-theme') === 'dark' || (!root.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = effectiveDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('mg-theme', next);
    updateThemeLabel();
  });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  const dropdowns = [...document.querySelectorAll('[data-nav-dropdown]')];

  const closeDropdowns = (except = null) => {
    dropdowns.forEach(dropdown => {
      if (dropdown === except) return;
      dropdown.classList.remove('open');
      dropdown.querySelector('[data-dropdown-toggle]')?.setAttribute('aria-expanded', 'false');
    });
  };

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('[data-dropdown-toggle]');
    toggle?.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains('open');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-nav-dropdown]')) closeDropdowns();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdowns();
      const openNav = nav?.classList.contains('open');
      if (openNav) {
        nav.classList.remove('open');
        document.body.classList.remove('mobile-nav-open');
        menuButton?.setAttribute('aria-expanded', 'false');
        menuButton?.setAttribute('aria-label', 'Open navigation menu');
        menuButton?.focus();
      }
    }
  });

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('mobile-nav-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (!open) closeDropdowns();
  });

  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('mobile-nav-open');
    closeDropdowns();
    menuButton?.setAttribute('aria-expanded','false');
    menuButton?.setAttribute('aria-label','Open navigation menu');
  }));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1040) {
      nav?.classList.remove('open');
      document.body.classList.remove('mobile-nav-open');
      closeDropdowns();
      menuButton?.setAttribute('aria-expanded','false');
      menuButton?.setAttribute('aria-label','Open navigation menu');
    }
  });

  // Mobile sticky contact bar.
  // Replace the two values below once with the firm's real number before launch.
  // PHONE_TEL should include the leading +country code. WHATSAPP_NUMBER must contain digits only.
  const PHONE_TEL = '+91XXXXXXXXXX';
  const WHATSAPP_NUMBER = '91XXXXXXXXXX';
  const WHATSAPP_MESSAGE = 'Hello MG Tax Consultant, I would like to discuss a tax service.';

  const mobileContactBar = document.createElement('nav');
  mobileContactBar.className = 'mobile-contact-bar';
  mobileContactBar.setAttribute('aria-label', 'Quick contact');
  mobileContactBar.innerHTML = `
    <a class="mobile-contact-action mobile-contact-call" href="tel:${PHONE_TEL}" aria-label="Call MG Tax Consultant">
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.08.36 2.24.55 3.43.55.55 0 1 .45 1 1V20a1 1 0 0 1-1 1C10.54 21 3 13.46 3 4.17a1 1 0 0 1 1-1H7.5c.55 0 1 .45 1 1 0 1.2.19 2.35.55 3.43a1 1 0 0 1-.25 1.02l-2.2 2.18Z"/></svg>
      <span>Call</span>
    </a>
    <a class="mobile-contact-action mobile-contact-whatsapp" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}" target="_blank" rel="noopener noreferrer" aria-label="Chat with MG Tax Consultant on WhatsApp">
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.55 0 .22 5.32.22 11.86c0 2.1.55 4.14 1.6 5.94L.12 24l6.35-1.66a11.9 11.9 0 0 0 5.62 1.43h.01c6.54 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.16-3.45-8.42Zm-8.42 18.3h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.77.99 1-3.67-.24-.38a9.8 9.8 0 0 1-1.5-5.27c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 7.02c0 5.45-4.43 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.48-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>
      <span>WhatsApp</span>
    </a>`;
  document.body.appendChild(mobileContactBar);

  const form = document.querySelector('[data-consultation-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) return;
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      status.textContent = 'Form interface is ready. Connect your preferred secure form endpoint before launch so enquiries are actually delivered.';
      status.className = 'status info show';
      status.setAttribute('role','status');
    });
  }
})();
