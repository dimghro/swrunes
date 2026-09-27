// Datele rămân într-un singur loc, ca un începător să poată actualiza ușor ghidul.
const sloturi = [
  ["1", "ATK flat (fix)", "Evaluează aproape exclusiv substat-urile.", "SPD > ATK% / HP% / DEF% > CR/CD > ACC/RES"],
  ["2", "SPD, ATK%, HP%, DEF%, flat", "SPD sau %. Main flat este în general de vândut.", "La SPD main: ATK/HP/DEF%, CR/CD, ACC/RES"],
  ["3", "DEF flat (fix)", "Evaluează aproape exclusiv substat-urile.", "SPD > HP% / DEF% / ATK% > CR/CD > ACC/RES"],
  ["4", "CD%, CR%, ATK%, HP%, DEF%, flat", "CD, CR sau %, conform rolului. Flat: în general vinde.", "SPD este aproape mereu excelent; potrivește restul cu rolul"],
  ["5", "HP flat (fix)", "Evaluează aproape exclusiv substat-urile.", "SPD > HP% / DEF% / ATK% > CR/CD > ACC/RES"],
  ["6", "ATK%, HP%, DEF%, ACC%, RES%, flat", "% sau ACC. RES este nișat; flat este în general de vândut.", "SPD + statistici potrivite rolului"],
];

const seturi = [
  ["Energy",2,"HP +15%","HP%, SPD, DEF%, RES/ACC","2: HP% · 4: HP%/DEF% · 6: HP%/DEF%","suport","Set broken: păstrează doar roll-uri foarte bune."],
  ["Guard",2,"DEF +15%","DEF%, HP%, SPD","2: DEF%/SPD · 4: DEF%/HP% · 6: DEF%","suport","Set broken: cere o combinație foarte bună."],
  ["Swift",4,"SPD +25%","SPD, apoi ATK%/HP%/DEF%/ACC","2: SPD · 4: rol-dependent · 6: ACC/%","viteză","SPD este aproape obligatoriu; excepție: Swift nuker."],
  ["Blade",2,"CR +12%","CR, CD, ATK%, SPD","2: ATK%/SPD · 4: CD%/CR% · 6: ATK%","damage","Caută SPD, ATK%, CD și HP/DEF; CR nu poate dubla main stat-ul."],
  ["Rage",4,"CD +40%","CD, CR, ATK%, SPD","2: ATK%/SPD · 4: CD% · 6: ATK%","damage","Fii conservator cu Rage 4 CD% care are substat-uri de damage bune."],
  ["Focus",2,"ACC +20%","SPD, ACC, HP%, DEF%","2: SPD/HP% · 4: HP%/DEF% · 6: ACC%","control","Set broken util pentru control; sinergia SPD + ACC contează."],
  ["Endure",2,"RES +20%","SPD, HP%, DEF%, RES","2: SPD/HP% · 4: HP%/DEF% · 6: RES%","suport","Set broken: nu păstra decât rune clar bune."],
  ["Fatal",4,"ATK +35%","ATK%, CR, CD, SPD","2: ATK%/SPD · 4: CD%/CR%/ATK% · 6: ATK%","damage","Prioritizează ATK%, CR, CD și SPD."],
  ["Despair",4,"25% șansă de stun","SPD, ACC, HP%, DEF%; CR/CD pentru nuker","2: SPD · 4: HP%/DEF% sau CD% · 6: ACC%/%","control","Pentru control: SPD + ACC + HP% + DEF%; există și Despair nuker."],
  ["Vampire",4,"Vindecă 35% din damage","ATK%, CR, CD, SPD, uneori HP%/DEF%","2: ATK%/SPD · 4: CD%/CR% · 6: ATK%","damage","Damage first; pentru anumite builduri, HP% și DEF% sunt importante."],
  ["Violent",4,"22% șansă de turn suplimentar","SPD, HP%, DEF%, ATK%, CR, CD, ACC, RES","2: SPD/% · 4: rol-dependent · 6: %/ACC","universal","Păstrează mai multe decât pe seturile obișnuite. Violent + SPD are aproape mereu potențial."],
  ["Nemesis",2,"+4% Attack Bar la fiecare 7% HP pierdut","SPD, HP%, DEF%, RES","2: SPD/HP% · 4: HP%/DEF% · 6: HP%/RES%","suport","Set defensiv, orientat spre supraviețuire și reacție."],
  ["Will",2,"Imunitate 1 tură","SPD, HP%, DEF%, RES, ACC; CR pentru bruiser","2: SPD/% · 4: HP%/DEF%/CR% · 6: HP%/DEF%/ACC%","universal","Foarte valoros. O Will bună fără SPD poate fi totuși valoroasă."],
  ["Shield",2,"Scut de 15% HP pentru echipă","HP%, SPD, DEF%, RES","2: SPD/HP% · 4: HP%/DEF% · 6: HP%","suport","Set de echipă: HP%, SPD și DEF% sunt prioritare."],
  ["Revenge",2,"15% contraatac","SPD, ATK%, CR, CD, HP/DEF","2: ATK%/SPD · 4: CD%/CR% · 6: ATK%/HP%","damage","SPD nu este obligatoriu; păstrează combinațiile puternice de damage sau bruiser."],
  ["Destroy",2,"Distruge până la 4% din HP maxim pe tură","HP%, DEF%, SPD, ATK%, CR","2: HP%/SPD · 4: HP%/DEF%/CR% · 6: HP%/DEF%","bruiser","Foarte bun ca set broken când are roll-uri excelente."],
  ["Fight",2,"ATK aliat +8%","SPD, ATK%, CR, CD","2: SPD/ATK% · 4: CD%/CR% · 6: ATK%","echipă","Set de echipă; potrivit pentru combinații 2 + 2 + 2."],
  ["Determination",2,"DEF aliat +8%","SPD, DEF%, HP%","2: SPD/DEF% · 4: DEF%/HP% · 6: DEF%","echipă","Set de echipă; caută SPD + DEF% + HP%."],
  ["Enhance",2,"HP aliat +8%","SPD, HP%, DEF%","2: SPD/HP% · 4: HP%/DEF% · 6: HP%","echipă","Set de echipă; caută SPD + HP% + DEF%."],
  ["Accuracy",2,"ACC aliat +10%","SPD, ACC, HP%, DEF%","2: SPD/HP% · 4: HP%/DEF% · 6: ACC%","echipă","Set de echipă pentru control/debuff; caută SPD + ACC + HP/DEF."],
  ["Tolerance",2,"RES aliat +10%","SPD, RES, HP%, DEF%","2: SPD/HP% · 4: HP%/DEF% · 6: RES%","echipă","Set de echipă; caută SPD + RES + HP/DEF."],
  ["Seal",2,"Seal Rate +15%","SPD, HP%, DEF%, ACC/RES","2: SPD/HP% · 4: HP%/DEF% · 6: ACC%/RES%","pvp","Mai relevant în PvP; nu trebuie să fie un set de damage."],
  ["Intangible",1,"Completează automat un set lipsă","Aproape orice substat-uri bune","2/4/6: ca setul pe care îl completează","special","Păstrează când are substat-uri bune. Nu poate fi reappraisată; folosește materiale speciale."],
];

// Opțiuni valide pentru formular. Ele previn, de exemplu, un CD% ca main stat pe slotul 2.
const mainStatsPeSlot = {
  1: ["ATK flat"],
  2: ["SPD", "ATK%", "HP%", "DEF%", "ATK flat", "HP flat", "DEF flat"],
  3: ["DEF flat"],
  4: ["CD%", "CR%", "ATK%", "HP%", "DEF%", "ATK flat", "HP flat", "DEF flat"],
  5: ["HP flat"],
  6: ["ATK%", "HP%", "DEF%", "ACC%", "RES%", "ATK flat", "HP flat", "DEF flat"],
};
const substatOptions = ["SPD", "ATK%", "HP%", "DEF%", "CR%", "CD%", "ACC", "RES", "ATK flat", "HP flat", "DEF flat"];
const maximeInitiale6 = { "ATK%":8, "HP%":8, "DEF%":8, ACC:8, RES:8, SPD:6, "CR%":6, "CD%":7, "ATK flat":20, "DEF flat":20, "HP flat":375 };

const labels = { toate:"Toate", viteză:"Viteză", damage:"Damage", control:"Control", suport:"Suport", bruiser:"Bruiser", echipă:"Echipă", pvp:"PvP", special:"Special" };
let filtru = "toate";
const esc = (text) => String(text ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");

function afiseazaSeturi() {
  const cautare = document.querySelector("#search").value.trim().toLowerCase();
  // Rolul este poziția 5 în fiecare set de date; folosim indexare explicită pentru a evita eliminările greșite la destructurare.
  const rezultate = seturi.filter(set => (filtru === "toate" || set[5] === filtru) && set[0].toLowerCase().includes(cautare));
  document.querySelector("#result-count").textContent = `${rezultate.length} din ${seturi.length} seturi afișate`;
  document.querySelector("#rune-grid").innerHTML = rezultate.map(([nume,piese,bonus,subs,sloturi,rol,nota]) => {
    // Desparte recomandarea pentru sloturile 2, 4 și 6 în trei casete ușor de comparat.
    const mainStats = sloturi.split(" · ").map(parte => {
      const [slot, ...recomandare] = parte.split(": ");
      return `<span><b>Slot ${esc(slot)}</b>${esc(recomandare.join(": "))}</span>`;
    }).join("");
    return `<article class="rune-card"><header><h3>${esc(nume)}</h3><div class="rune-meta">${piese} ${piese === 1 ? "piesă" : "piese"} · ${esc(labels[rol])}</div></header><dl><dt>Bonus de set</dt><dd>${esc(bonus)}</dd><dt>Main stats preferate</dt><dd class="main-stat-slots">${mainStats}</dd><dt>Substat-uri de urmărit</dt><dd>${esc(subs)}</dd></dl><div class="note">${esc(nota)}</div></article>`;
  }).join("") || "<p>Nu există seturi care corespund filtrului.</p>";
}

document.querySelector("#slot-table").innerHTML = sloturi.map(s => `<tr>${s.map((v,i) => `<td${i===0?' scope="row"':''}>${v}</td>`).join("")}</tr>`).join("");
document.querySelector("#filters").innerHTML = Object.entries(labels).map(([id,nume]) => `<button class="filter-button ${id === "toate" ? "active" : ""}" data-filter="${id}">${nume}</button>`).join("");
document.querySelector("#search").addEventListener("input", afiseazaSeturi);
document.querySelector("#filters").addEventListener("click", (event) => { const buton = event.target.closest("button"); if (!buton) return; filtru = buton.dataset.filter; document.querySelectorAll(".filter-button").forEach(b => b.classList.toggle("active", b === buton)); afiseazaSeturi(); });
afiseazaSeturi();

// EVALUATORUL: folosește doar regulile vizibile în ghid, fără servicii externe sau AI.
const formular = document.querySelector("#rune-builder");
const setEvaluator = document.querySelector("#eval-set");
const slotEvaluator = document.querySelector("#eval-slot");
const mainEvaluator = document.querySelector("#eval-main");
const campuriSubstat = document.querySelector("#substat-fields");
const rezultatEvaluator = document.querySelector("#evaluation-result");

function optiuni(items, gol) {
  return `<option value="">${gol}</option>${items.map(item => `<option value="${esc(item)}">${esc(item)}</option>`).join("")}`;
}

function actualizeazaMainStats() {
  const valoareAnterioara = mainEvaluator.value;
  const slotCurent = slotEvaluator.value || "2";
  mainEvaluator.innerHTML = optiuni(mainStatsPeSlot[slotCurent], "Alege main stat-ul");
  if (mainStatsPeSlot[slotCurent].includes(valoareAnterioara)) mainEvaluator.value = valoareAnterioara;
}

function construiesteEvaluator() {
  setEvaluator.innerHTML = seturi.map(([nume]) => `<option value="${esc(nume)}">${esc(nume)}</option>`).join("");
  actualizeazaMainStats();
  campuriSubstat.innerHTML = Array.from({ length:4 }, (_, index) => `<div class="substat-row"><select aria-label="Substat ${index + 1}">${optiuni(substatOptions, `Substat ${index + 1}`)}</select><input type="number" min="0" inputmode="decimal" aria-label="Valoare substat ${index + 1}" placeholder="Valoare" /></div>`).join("");
}

function esteMainBun(slot, main) {
  if (["ATK flat", "HP flat", "DEF flat"].includes(main) && ["2", "4", "6"].includes(slot)) return "flat";
  if (slot === "6" && main === "RES%") return "situational";
  return "bun";
}

function recomandareSet(set, slot, stat) {
  const descriere = set[4].split(" · ").find(parte => parte.startsWith(`${slot}:`)) || "";
  // "%" în date reprezintă opțiunile procentuale relevante; Intangible depinde de setul completat.
  return descriere.includes("rol-dependent") || descriere.includes("ca setul") || descriere.includes(stat) || (stat.endsWith("%") && descriere.includes("%"));
}

function evalueazaRuna(event) {
  event.preventDefault();
  const set = seturi.find(([nume]) => nume === setEvaluator.value);
  const slot = slotEvaluator.value;
  const main = mainEvaluator.value;
  const stele = Number(document.querySelector("#eval-stars").value);
  const raritate = document.querySelector("#eval-rarity").value;
  const upgrade = Number(document.querySelector("#eval-upgrade").value);
  const ancient = document.querySelector("#eval-ancient").checked;
  const substaturi = [...campuriSubstat.querySelectorAll(".substat-row")].map(rand => ({ stat:rand.querySelector("select").value, valoare:Number(rand.querySelector("input").value) })).filter(({ stat }) => stat);
  const motive = [];
  const probleme = [];
  let scor = 0;

  if (!main || substaturi.length === 0) probleme.push("Alege main stat-ul și cel puțin un substat.");
  const duplicate = substaturi.map(({ stat }) => stat).filter((stat, index, lista) => lista.indexOf(stat) !== index);
  if (duplicate.length) probleme.push("Aceeași statistică nu poate apărea de două ori ca substat.");
  if (substaturi.some(({ stat }) => stat === main)) probleme.push("Main stat-ul nu poate fi și substat.");
  if (probleme.length) {
    rezultatEvaluator.innerHTML = `<div class="result-rune" aria-hidden="true">!</div><p class="eyebrow">CORECTEAZĂ RUNA</p><h3 class="verdict-fix">Date incompatibile</h3><ul class="evaluation-reasons">${probleme.map(problema => `<li>${esc(problema)}</li>`).join("")}</ul>`;
    return;
  }

  if (stele === 6) { scor += 2; motive.push("6★: bază potrivită pentru un filtru exigent."); }
  else { scor -= 2; motive.push("5★: ghidul recomandă să fii mult mai selectiv."); }
  const bonusRaritate = { rare:0, hero:1, legend:2 }[raritate];
  scor += bonusRaritate;
  if (raritate === "legend") motive.push("Legend: merită verificată înainte de vânzare.");
  if (ancient) { scor += 1; motive.push("Ancient: are prioritate mai mare prin valorile inițiale de substat."); }

  const tipMain = esteMainBun(slot, main);
  if (tipMain === "flat") { scor -= 5; motive.push("Main stat flat pe slotul 2, 4 sau 6: în majoritatea cazurilor este de vândut."); }
  else if (tipMain === "situational") { scor += 1; motive.push("RES% pe slotul 6 este nișat: păstrează doar cu un scop clar."); }
  else { scor += 2; motive.push("Main stat potrivit pentru slot."); }
  if (recomandareSet(set, slot, main)) { scor += 1; motive.push(`Main stat compatibil cu recomandarea pentru ${set[0]}.`); }
  else if (set[0] !== "Intangible") { scor -= 1; motive.push(`Main stat mai puțin potrivit pentru rolul uzual al setului ${set[0]}.`); }

  let substatBun = 0;
  let substatFlat = 0;
  substaturi.forEach(({ stat, valoare }) => {
    const cautatDeSet = set[3].includes(stat);
    if (stat === "SPD") { scor += 2; substatBun++; motive.push("SPD prezent: semnal puternic de potențial."); }
    else if (["ATK%", "HP%", "DEF%", "CR%", "CD%"].includes(stat)) { scor += cautatDeSet ? 1.5 : .75; substatBun++; }
    else if (["ACC", "RES"].includes(stat)) { scor += cautatDeSet ? 1.25 : .25; if (cautatDeSet) substatBun++; }
    else { scor -= 1.25; substatFlat++; }
    if (upgrade === 0 && valoare && maximeInitiale6[stat] && valoare >= maximeInitiale6[stat]) motive.push(`${stat} la valoarea inițială maximă normală de 6★.`);
  });
  if (substatBun >= 3) { scor += 2; motive.push("Cel puțin trei substat-uri au sinergie clară."); }
  if (substatFlat >= 2) motive.push("Două sau mai multe substat-uri flat reduc mult potențialul.");
  if (!substaturi.some(({ stat }) => stat === "SPD") && substatBun >= 3) motive.push("Lipsa SPD este compensată parțial de o combinație puternică de alte statistici.");

  let verdict = "VERIFICĂ / UPGRADEAZĂ";
  let clasa = "verdict-check";
  if (scor >= 8) { verdict = "PĂSTREAZĂ"; clasa = "verdict-keep"; }
  if (scor <= 1) { verdict = "VINDE"; clasa = "verdict-sell"; }
  const notaUpgrade = upgrade === 0
    ? "La +0, valorile care ating maximele inițiale normale de 6★ sunt evidențiate. După +3/+6/+9, continuă numai dacă roll-urile merg în statisticile bune."
    : "Calitatea exactă a roll-urilor se confirmă comparând direcția lor la +3, +6 și +9; evaluatorul prioritizează aici compoziția statisticilor.";
  rezultatEvaluator.innerHTML = `<div class="result-rune" aria-hidden="true">✦</div><p class="eyebrow">VERDICT · SCOR ${Math.max(0, Math.round(scor))}</p><h3 class="${clasa}">${verdict}</h3><ul class="evaluation-reasons">${motive.slice(0, 6).map(motiv => `<li>${esc(motiv)}</li>`).join("")}</ul><p class="evaluation-note">${esc(notaUpgrade)}</p>`;
}

construiesteEvaluator();
slotEvaluator.addEventListener("change", actualizeazaMainStats);
formular.addEventListener("submit", evalueazaRuna);
