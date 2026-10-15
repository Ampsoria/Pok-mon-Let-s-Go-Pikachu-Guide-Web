(() => {
  if (!('IntersectionObserver' in window) || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  const selector = '.section-head, .guide-intro, .map-place, .quick-strip a, .journey-card, .gym-card, .elite-card, .tech-card, .pokemon-card, .secret-card, .item-card, .ride-card, .how-grid article, .guide-note';
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('fx-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });

  function prepare(root) {
    const elements = root.matches?.(selector) ? [root] : [...root.querySelectorAll(selector)];
    elements.forEach((element, index) => {
      if (element.dataset.fxSeen || element.classList.contains('fx-ready')) return;
      element.classList.add('fx-ready');
      element.style.setProperty('--fx-delay', `${Math.min(index % 5, 4) * 55}ms`);
      const finishReveal = event => {
        if (event.animationName !== 'fx-rise') return;
        element.dataset.fxSeen = 'true';
        element.classList.remove('fx-ready', 'fx-visible');
        element.style.removeProperty('--fx-delay');
        element.removeEventListener('animationend', finishReveal);
      };
      element.addEventListener('animationend', finishReveal);
      observer.observe(element);
    });
  }

  prepare(document);
  ['dexGrid', 'itemGrid', 'rideGrid'].forEach(id => {
    const grid = document.getElementById(id);
    if (!grid) return;
    new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) prepare(node);
      }));
    }).observe(grid, { childList: true });
  });
})();
