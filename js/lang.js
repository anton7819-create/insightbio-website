// ── INSIGHTBIO Language Toggle ───────────────────────────────
// Usage: add data-en="..." data-es="..." to any element.
// For placeholders: data-ph-en="..." data-ph-es="..."

(function () {
  const STORAGE_KEY = 'ib_lang';
  let current = localStorage.getItem(STORAGE_KEY) || 'en';

  function applyLang(lang) {
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // text content
    document.querySelectorAll('[data-en]').forEach(el => {
      const txt = el.getAttribute('data-' + lang);
      if (txt !== null) el.textContent = txt;
    });

    // placeholders (inputs/textareas)
    document.querySelectorAll('[data-ph-en]').forEach(el => {
      const ph = el.getAttribute('data-ph-' + lang);
      if (ph !== null) el.placeholder = ph;
    });

    // html content (for elements needing markup)
    document.querySelectorAll('[data-html-en]').forEach(el => {
      const html = el.getAttribute('data-html-' + lang);
      if (html !== null) el.innerHTML = html;
    });

    // toggle buttons
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // html lang attribute
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  }

  function init() {
    // wire up buttons
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    // burger menu
    const burger = document.querySelector('.nav-burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
      burger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    // apply on load
    applyLang(current);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
