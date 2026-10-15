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
      const position = elements.length === 1 && element.parentElement
        ? Array.prototype.indexOf.call(element.parentElement.children, element)
        : index;
      element.classList.add('fx-ready');
      element.style.setProperty('--fx-delay', `${Math.min(position % 5, 4) * 55}ms`);
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

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const scene = document.querySelector('.hero-art');
  if (scene) {
    let pending = false;
    let tiltX = 0;
    let tiltY = 0;
    scene.addEventListener('pointermove', event => {
      const bounds = scene.getBoundingClientRect();
      tiltX = ((event.clientY - bounds.top) / bounds.height - .5) * -10;
      tiltY = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        scene.classList.add('is-interacting');
        scene.style.setProperty('--scene-x', `${tiltX.toFixed(2)}deg`);
        scene.style.setProperty('--scene-y', `${tiltY.toFixed(2)}deg`);
        pending = false;
      });
    });
    scene.addEventListener('pointerleave', () => {
      scene.classList.remove('is-interacting');
      scene.style.removeProperty('--scene-x');
      scene.style.removeProperty('--scene-y');
    });
  }

  ['dexGrid', 'rideGrid'].forEach(id => {
    const grid = document.getElementById(id);
    if (!grid) return;
    grid.addEventListener('pointermove', event => {
      const card = event.target.closest('.pokemon-card, .ride-card');
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--card-x', `${(((event.clientY - bounds.top) / bounds.height - .5) * -10).toFixed(2)}deg`);
      card.style.setProperty('--card-y', `${(((event.clientX - bounds.left) / bounds.width - .5) * 12).toFixed(2)}deg`);
    });
    grid.addEventListener('pointerout', event => {
      const card = event.target.closest('.pokemon-card, .ride-card');
      if (!card || card.contains(event.relatedTarget)) return;
      card.style.removeProperty('--card-x');
      card.style.removeProperty('--card-y');
    });
  });
})();
