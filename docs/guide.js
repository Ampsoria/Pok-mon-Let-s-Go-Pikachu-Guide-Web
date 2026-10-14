(() => {
  const $ = s => document.querySelector(s);
  const page = document.body.dataset.page;
  let lang = localStorage.getItem('kc-lang') === 'en' ? 'en' : 'th';
  let active = page === 'items' ? 'balls' : 'all';
  let tms = [];
  const copy = {
    th: {home:'หน้าหลัก',dex:'โปเกเดกซ์',items:'ไอเท็ม',rides:'โปเกมอนขี่',itemsKicker:'FIELD NOTES / 01',itemsTitle:'กระเป๋าของเทรนเนอร์',itemsLead:'ค้นหา Poké Ball, ยา, ลูกกวาด และ TM ทุกหมายเลข พร้อมวิธีรับและราคาที่มีข้อมูลยืนยันสำหรับภาค Let’s Go',ridesCta:'ต่อไป: โปเกมอนขี่',browseKicker:'ITEM INDEX',browseTitle:'เปิดดูอุปกรณ์',browseLead:'กดการ์ดเพื่อดูรายละเอียด ราคา และจุดรับ',tmCountLabel:'TM ทั้งหมด',candyNoteTitle:'รู้ไว้เรื่องลูกกวาด',candyNote:'ลูกกวาดค่าสถานะ 6 ชนิดมีรุ่น L และ XL ตามระดับโปเกมอนที่ใช้ได้ ส่วนลูกกวาดประจำสายพันธุ์เพิ่มทุกค่าสถานะ หาได้จากการจับซ้ำและส่งโปเกมอนให้ Professor Oak',ridesTitle:'ออกเดินทางไปด้วยกัน',ridesLead:'ขี่โปเกมอน 18 ตัวทั่วคันโต ตั้งแต่ Arcanine ที่วิ่งเร็ว ไปจนถึง Dragonite ที่บินข้ามสิ่งกีดขวางได้หลังจบลีก',itemsCta:'ดูคู่มือไอเท็ม',howKicker:'HOW TO RIDE',howTitle:'เริ่มขี่อย่างไร?',step1Title:'เลือกโปเกมอน',step1Body:'เปิดเมนู Party แล้วเลือกโปเกมอนขี่ได้ที่อยู่ในทีม',step2Title:'ปล่อยออกจากบอล',step2Body:'เลือก “Take out of Poké Ball” เพื่อให้โปเกมอนตามเรา แล้วตัวละครจะขี่อัตโนมัติ',step3Title:'ปลดล็อกตามประเภท',step3Body:'Gyarados และ Lapras ขี่ได้บนผิวน้ำเมื่อใช้ Sea Skim; การบินสูงข้ามสิ่งกีดขวางปลดล็อกหลังชนะจตุรเทพ',rideNoteTitle:'การขี่และ Secret Techniques',rideNote:'การเดินทางทางน้ำยังต้องเรียน Sea Skim ก่อน ส่วน Charizard, Aerodactyl และ Dragonite จะบินสูงข้ามสิ่งกีดขวางได้หลังชนะ Pokémon League',rideDexKicker:'RIDE DEX',rideDexTitle:'เลือกเพื่อนร่วมทาง',rideDexLead:'กดการ์ดเพื่อดูวิธีรับโปเกมอนแต่ละตัว',ridesCountLabel:'ตัวที่ขี่ได้',disclaimer:'คู่มือแฟนเมด Pokémon: Let’s Go, Pikachu! ไม่เกี่ยวข้องกับ Nintendo หรือ The Pokémon Company',all:'ทั้งหมด',balls:'Poké Ball',medicine:'ยา',candy:'ลูกกวาด',tm:'TM 01–60',field:'ไอเท็มเดินทาง',ground:'บนบก',water:'ในน้ำ',air:'บนฟ้า',price:'ราคาซื้อ',notSold:'ไม่ได้ขายทั่วไป',where:'วิธีได้รับ',effect:'รายละเอียด',stats:'ข้อมูลท่า',power:'พลัง',accuracy:'แม่นยำ',search:'ค้นหาชื่อ / TM / สถานที่',found:'รายการ',noResults:'ไม่พบรายการ',candyWhere:'จับโปเกมอนซ้ำ ทำ Catch Combo หรือส่งโปเกมอนให้ Professor Oak',tmUse:'สอนท่านี้ให้โปเกมอนที่ใช้ได้ TM ใช้ซ้ำได้ไม่จำกัด',airNote:'หลังชนะ Pokémon League จึงบินสูงข้ามสิ่งกีดขวางได้',waterNote:'ต้องเรียน Secret Technique: Sea Skim ก่อน',fastNote:'เคลื่อนที่บนบกได้เร็วขึ้น',rideHow:'วิธีได้รับ',rideKind:'รูปแบบการขี่'},
    en: {home:'Home',dex:'Pokédex',items:'Items',rides:'Ride Pokémon',itemsKicker:'FIELD NOTES / 01',itemsTitle:'The Trainer’s Bag',itemsLead:'Browse Poké Balls, medicine, candy, and all 60 TMs, with locations and verified Let’s Go shop prices.',ridesCta:'Next: Ride Pokémon',browseKicker:'ITEM INDEX',browseTitle:'Explore the essentials',browseLead:'Select a card for its effect, price, and location.',tmCountLabel:'TMs to collect',candyNoteTitle:'A note on candy',candyNote:'The six stat candies have L and XL versions for different Pokémon levels. Species candy raises all stats for its evolutionary family. Catching repeatedly and sending Pokémon to Professor Oak are useful sources.',ridesTitle:'Travel together',ridesLead:'Ride 18 Pokémon around Kanto, from speedy Arcanine to Dragonite flying over obstacles after the League.',itemsCta:'Browse items',howKicker:'HOW TO RIDE',howTitle:'How do you ride?',step1Title:'Choose a Pokémon',step1Body:'Open Party and select a rideable Pokémon in your team.',step2Title:'Take it out',step2Body:'Choose “Take out of Poké Ball.” It will follow you and you will ride it automatically.',step3Title:'Unlock special travel',step3Body:'Gyarados and Lapras can be ridden while using Sea Skim. High flight over obstacles unlocks after the Pokémon League.',rideNoteTitle:'Riding and Secret Techniques',rideNote:'Water travel still requires Sea Skim. Charizard, Aerodactyl, and Dragonite can fly high over obstacles after you beat the Pokémon League.',rideDexKicker:'RIDE DEX',rideDexTitle:'Choose a travel buddy',rideDexLead:'Select a card to see how to get each Pokémon.',ridesCountLabel:'rideable Pokémon',disclaimer:'A fan-made Pokémon: Let’s Go, Pikachu! guide. Not affiliated with Nintendo or The Pokémon Company.',all:'All',balls:'Poké Balls',medicine:'Medicine',candy:'Candy',tm:'TM 01–60',field:'Field items',ground:'Ground',water:'Water',air:'Air',price:'Shop price',notSold:'Not normally sold',where:'Where to get it',effect:'What it does',stats:'Move data',power:'Power',accuracy:'Accuracy',search:'Search name / TM / location',found:'results',noResults:'No matching items',candyWhere:'Catch Pokémon, build Catch Combos, or send Pokémon to Professor Oak',tmUse:'Teach this move to a compatible Pokémon. TMs are reusable.',airNote:'High flight over obstacles unlocks after the Pokémon League',waterNote:'Requires Secret Technique: Sea Skim',fastNote:'Moves faster on the ground',rideHow:'How to get it',rideKind:'Ride style'}
  };
  const tx = key => copy[lang][key] || key;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const badge = (kind, label) => `<span class="item-badge ${esc(kind)}">${esc(label)}</span>`;
  const category = c => tx(c);
  const icon = c => `<span class="item-icon icon-${esc(c)}" aria-hidden="true"><i></i></span>`;
  const fmt = n => Number(n).toLocaleString('en-US');
  function renderChrome() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(el => el.textContent = tx(el.dataset.t));
    $('#langBtn').textContent = lang === 'th' ? 'EN' : 'ไทย';
    $('#mobileNav').innerHTML = $('.desktop-nav').innerHTML;
    if (page === 'items') $('#itemSearch').placeholder = tx('search');
  }
  function allItems() { return [...itemData, ...tms.map(tm => ({...tm,c:'tm',n:`${tm.no} ${tm.name}`,p:tm.price}))]; }
  function renderItems() {
    const tabs = ['all','balls','medicine','candy','tm','field'];
    $('#itemTabs').innerHTML = tabs.map(c => `<button type="button" data-tab="${c}" class="${active===c?'active':''}" aria-pressed="${active===c}">${esc(category(c))}</button>`).join('');
    const q = $('#itemSearch').value.trim().toLocaleLowerCase();
    const items = allItems().filter(x => (active === 'all' || x.c === active) && (!q || [x.n,x.th,x.en,x.location,x.stat,x.type].some(v => String(v||'').toLocaleLowerCase().includes(q))));
    $('#resultCount').textContent = `${items.length} ${tx('found')}`;
    $('#itemGrid').innerHTML = items.length ? items.map(x => `<button type="button" class="item-card ${esc(x.c)}" data-item="${esc(x.n)}"><span class="item-card-top">${icon(x.c)}${badge(x.c,category(x.c))}</span><strong>${esc(x.n)}</strong><span class="item-card-desc">${esc(x.c==='tm' ? `${x.type} · ${x.location}` : x[lang])}</span><span class="item-card-foot">${x.p ? `<b>₽${fmt(x.p)}</b>` : x.c==='tm' ? `<b>PP ${esc(x.pp)}</b>` : x.stat ? `<b>${esc(x.stat)}</b>` : '<span>✦</span>'}<span aria-hidden="true">↗</span></span></button>`).join('') : `<div class="empty-state">${tx('noResults')}</div>`;
  }
  function renderRides() {
    const tabs = ['all','ground','water','air'];
    $('#rideTabs').innerHTML = tabs.map(c => `<button type="button" data-tab="${c}" class="${active===c?'active':''}" aria-pressed="${active===c}">${esc(category(c))}</button>`).join('');
    const rides = rideData.filter(x => active === 'all' || x.kind === active);
    $('#resultCount').textContent = `${rides.length} ${tx('found')}`;
    $('#rideGrid').innerHTML = rides.map(x => `<button type="button" class="ride-card ${esc(x.kind)}" data-ride="${x.id}"><span class="ride-portrait"><img src="assets/${x.id}.png" alt="" loading="lazy"></span><span class="ride-number">#${String(x.id).padStart(3,'0')}</span><strong>${esc(x.n)}</strong><span class="ride-kind">${esc(category(x.kind))}${x.fast ? ' · ⚡' : ''}</span><span class="ride-arrow" aria-hidden="true">↗</span></button>`).join('');
  }
  function showItem(name) {
    const x = allItems().find(v => v.n === name); if (!x) return;
    const isTm = x.c === 'tm';
    const effect = isTm ? tmEffects[x.no][lang === 'th' ? 0 : 1] : x[lang];
    const where = isTm ? x.location : x.c === 'candy' && !x.whereTh ? tx('candyWhere') : x[lang==='th'?'whereTh':'whereEn'];
    $('#dialogBody').innerHTML = `<div class="dialog-head">${icon(x.c)}${badge(x.c,category(x.c))}<h2 id="dialogTitle">${esc(x.n)}</h2><p>${esc(effect)}</p></div><div class="dialog-facts"><div><small>${esc(tx('price'))}</small><strong>${x.p ? `₽${fmt(x.p)}` : esc(tx('notSold'))}</strong></div><div><small>${esc(tx('where'))}</small><strong>${esc(where || tx('notSold'))}</strong></div>${isTm ? `<div><small>${esc(tx('stats'))}</small><strong>${esc(x.type)} · PP ${esc(x.pp)} · ${esc(tx('power'))} ${esc(x.power)} · ${esc(tx('accuracy'))} ${esc(x.accuracy)}</strong></div><div><small>TM</small><strong>${esc(tx('tmUse'))}</strong></div>` : x.stat ? `<div><small>${esc(tx('effect'))}</small><strong>${esc(x.stat)}</strong></div>` : ''}</div>`;
    $('#detailDialog').showModal();
  }
  function showRide(id) {
    const x = rideData.find(v => v.id === id); if (!x) return;
    const note = x.kind === 'air' ? tx('airNote') : x.kind === 'water' ? tx('waterNote') : x.fast ? tx('fastNote') : '';
    $('#dialogBody').innerHTML = `<div class="dialog-head ride-dialog-head"><img src="assets/${x.id}.png" alt=""><span class="item-badge ${esc(x.kind)}">${esc(category(x.kind))}</span><h2 id="dialogTitle">${esc(x.n)}</h2><p>#${String(x.id).padStart(3,'0')}</p></div><div class="dialog-facts"><div><small>${esc(tx('rideHow'))}</small><strong>${esc(x[lang])}</strong></div><div><small>${esc(tx('rideKind'))}</small><strong>${esc(category(x.kind))}${note ? ` · ${esc(note)}` : ''}</strong></div></div>`;
    $('#detailDialog').showModal();
  }
  function render() { renderChrome(); page === 'items' ? renderItems() : renderRides(); }
  $('#langBtn').addEventListener('click', () => { lang = lang === 'th' ? 'en' : 'th'; localStorage.setItem('kc-lang',lang); render(); });
  $('#menuBtn').addEventListener('click', () => { const isOpen = $('#mobileNav').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded',isOpen); });
  $('#mobileNav').addEventListener('click', e => { if (e.target.closest('a')) { $('#mobileNav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false'); } });
  document.addEventListener('click', e => { const tab=e.target.closest('[data-tab]'); if(tab){active=tab.dataset.tab;page==='items'?renderItems():renderRides();} const item=e.target.closest('[data-item]');if(item)showItem(item.dataset.item); const ride=e.target.closest('[data-ride]');if(ride)showRide(Number(ride.dataset.ride)); });
  $('#detailClose').addEventListener('click',()=>$('#detailDialog').close());
  $('#detailDialog').addEventListener('click',e=>{if(e.target===$('#detailDialog'))$('#detailDialog').close();});
  if (page === 'items') {
    $('#itemSearch').addEventListener('input', () => { if ($('#itemSearch').value.trim()) active='all'; renderItems(); });
    fetch('tm-data.json').then(r=>{if(!r.ok)throw Error('TM data unavailable');return r.json()}).then(rows=>{tms=rows;renderItems()}).catch(()=>{ /* Other item categories remain usable. */ });
  }
  render();
})();
