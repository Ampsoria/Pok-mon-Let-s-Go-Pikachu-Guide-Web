(() => {
  const home = document.body.dataset.page !== 'items' && document.body.dataset.page !== 'rides';
  const sections = [
    ['journey', 'การเดินทาง', 'Journey', '✦'],
    ['gyms', 'ยิม', 'Gyms', '◆'],
    ['elite', 'จตุรเทพ', 'Elite Four', '★'],
    ['techniques', 'เทคนิคพิเศษ', 'Secret Techniques', '✂'],
    ['types', 'แพ้ชนะธาตุ', 'Type Matchups', '⚡'],
    ['dex', 'โปเกเดกซ์', 'Pokédex', '◉'],
    ['puzzles', 'วิธีแก้ปริศนา', 'Puzzles', '◇'],
    ['secrets', 'ความลับ', 'Secrets', '✧'],
    ['items.html', 'ไอเท็มและ TM', 'Items & TMs', '▣'],
    ['rides.html', 'โปเกมอนขี่', 'Ride Pokémon', '➤']
  ];
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'pikachu-nav-button';
  button.innerHTML = '<img src="assets/25.png" alt=""><span aria-hidden="true">✦</span>';
  button.setAttribute('aria-haspopup', 'dialog');
  const dialog = document.createElement('dialog');
  dialog.className = 'pikachu-nav-dialog';
  dialog.innerHTML = '<div class="pikachu-nav-head"><img src="assets/25.png" alt=""><div><small>PIKA! PIKA!</small><h2 id="pikachuNavTitle"></h2></div><button type="button" class="pikachu-nav-close" aria-label="Close">×</button></div><nav class="pikachu-nav-links" aria-label="Quick navigation"></nav><button type="button" class="pikachu-nav-top"></button>';
  dialog.setAttribute('aria-labelledby', 'pikachuNavTitle');
  document.body.append(button, dialog);
  const close = dialog.querySelector('.pikachu-nav-close');
  const top = dialog.querySelector('.pikachu-nav-top');
  const links = dialog.querySelector('.pikachu-nav-links');
  function render() {
    const th = document.documentElement.lang !== 'en';
    button.setAttribute('aria-label', th ? 'เปิดเมนูเลือกหัวข้อกับพิกาชู' : 'Open Pikachu quick navigation');
    dialog.querySelector('h2').textContent = th ? 'อยากไปหัวข้อไหน?' : 'Where would you like to go?';
    close.setAttribute('aria-label', th ? 'ปิดเมนู' : 'Close menu');
    top.textContent = th ? '↑ กลับไปด้านบน' : '↑ Back to top';
    links.innerHTML = sections.map(([path, thai, english, icon]) => {
      const href = path.includes('.html') ? path : `${home ? '' : 'index.html'}#${path}`;
      return `<a href="${href}"><span aria-hidden="true">${icon}</span>${th ? thai : english}<span aria-hidden="true">↗</span></a>`;
    }).join('');
  }
  render();
  new MutationObserver(render).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  button.addEventListener('click', () => { dialog.showModal(); close.focus(); });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  links.addEventListener('click', event => { if (event.target.closest('a')) dialog.close(); });
  top.addEventListener('click', () => { dialog.close(); window.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); });
})();
