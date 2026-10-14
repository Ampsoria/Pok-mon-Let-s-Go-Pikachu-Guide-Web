/* Learnsets for the Let's Go, Pikachu!/Eevee version group are bundled in pokedex.json. */
let moveCurrentLevel = 1;
let moveTargetLevel = 30;

const moveText = {
  th: {
    title: 'ท่าและเลเวลที่เรียน', current: 'เลเวลปัจจุบัน', target: 'เลเวลเป้าหมาย',
    learned: 'ท่าที่เรียนได้ถึงตอนนี้', upcoming: 'ท่าใหม่ก่อนถึงเป้าหมาย',
    later: 'ท่าหลังเลเวลเป้าหมาย', evolution: 'ท่าเมื่อวิวัฒนาการ',
    machines: 'ท่าที่เรียนได้จาก TM', empty: 'ไม่มีท่าใหม่ในช่วงเลเวลนี้',
    note: 'รายการนี้แสดงท่าที่เรียนได้ ไม่ใช่ 4 ท่าที่โปเกมอนกำลังใช้จริง ชื่อท่าเป็นภาษาอังกฤษ และท่าพิเศษของพิคาชูคู่หูที่ได้จากผู้สอนอยู่นอกตารางเลเวล',
    power: 'พลัง', accuracy: 'แม่นยำ', physical: 'กายภาพ', special: 'พิเศษ', status: 'สถานะ', evolutionLevel: 'วิวัฒนาการ'
  },
  en: {
    title: 'Moves & level planner', current: 'Current level', target: 'Target level',
    learned: 'Learnable by current level', upcoming: 'New moves by target level',
    later: 'Moves after target level', evolution: 'Moves on evolution',
    machines: 'TM moves', empty: 'No new moves in this level range',
    note: 'These are learnable moves, not the four moves currently equipped. Partner Pikachu’s special tutor moves are outside the level-up list.',
    power: 'Power', accuracy: 'Accuracy', physical: 'Physical', special: 'Special', status: 'Status', evolutionLevel: 'Evolution'
  }
};

function moveCard(move, label) {
  const t = moveText[lang];
  const category = t[move.category] || move.category;
  return `<li class="move-card"><span class="move-level">${safe(label)}</span><div class="move-main"><strong>${safe(move.name)}</strong><span class="move-meta">${chip(move.type)}<span>${category}</span><span>PP ${move.pp ?? '—'}</span>${move.power !== null ? `<span>${t.power} ${move.power}</span>` : ''}${move.accuracy !== null ? `<span>${t.accuracy} ${move.accuracy}%</span>` : ''}</span></div></li>`;
}

function moveList(moves, labelFor) {
  return moves.length ? `<ul class="move-list">${moves.map(m => moveCard(m, labelFor(m))).join('')}</ul>` : `<p class="move-empty">${moveText[lang].empty}</p>`;
}

function renderMoveResults(p) {
  const t = moveText[lang];
  const all = p.moves?.levelUp || [];
  const reached = all.filter(m => m.level <= moveCurrentLevel);
  const upcoming = all.filter(m => m.level > moveCurrentLevel && m.level <= moveTargetLevel);
  const later = all.filter(m => m.level > moveTargetLevel);
  return `<div class="move-results"><section class="move-group"><h4>${t.learned} <span>${reached.length}</span></h4>${moveList(reached, m => `Lv ${m.level}`)}</section><section class="move-group move-upcoming"><h4>${t.upcoming} <span>${upcoming.length}</span></h4>${moveList(upcoming, m => `Lv ${m.level}`)}</section></div><div class="move-extra"><details><summary>${t.later} <b>${later.length}</b></summary>${moveList(later, m => `Lv ${m.level}`)}</details><details><summary>${t.evolution} <b>${p.moves?.evolution?.length || 0}</b></summary>${moveList(p.moves?.evolution || [], () => t.evolutionLevel)}</details><details><summary>${t.machines} <b>${p.moves?.tm?.length || 0}</b></summary>${moveList(p.moves?.tm || [], () => 'TM')}</details></div>`;
}

function renderMovePlanner(p) {
  const t = moveText[lang];
  return `<section class="detail-moves" aria-label="${t.title}"><div class="move-heading"><h3>${t.title}</h3><div class="move-controls"><label>${t.current}<input id="currentLevel" type="number" min="1" max="100" inputmode="numeric" value="${moveCurrentLevel}"></label><label>${t.target}<input id="targetLevel" type="number" min="1" max="100" inputmode="numeric" value="${moveTargetLevel}"></label></div></div><p class="move-note">${t.note}</p><div id="moveResults">${renderMoveResults(p)}</div></section>`;
}

document.addEventListener('change', event => {
  if (!event.target.matches('#currentLevel, #targetLevel')) return;
  const clamp = value => Math.min(100, Math.max(1, Number.isFinite(value) ? value : 1));
  moveCurrentLevel = clamp(Number.parseInt(document.querySelector('#currentLevel').value, 10));
  moveTargetLevel = Math.max(moveCurrentLevel, clamp(Number.parseInt(document.querySelector('#targetLevel').value, 10)));
  document.querySelector('#currentLevel').value = moveCurrentLevel;
  document.querySelector('#targetLevel').value = moveTargetLevel;
  const p = dex.find(item => item.id === currentPokemonId);
  if (p) document.querySelector('#moveResults').innerHTML = renderMoveResults(p);
});
