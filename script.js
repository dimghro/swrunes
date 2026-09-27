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

const labels = { toate:"Toate", viteză:"Viteză", damage:"Damage", control:"Control", suport:"Suport", bruiser:"Bruiser", echipă:"Echipă", pvp:"PvP", special:"Special" };
let filtru = "toate";
const esc = (text) => text.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");

function afiseazaSeturi() {
  const cautare = document.querySelector("#search").value.trim().toLowerCase();
  const rezultate = seturi.filter(([nume,,,,,rol]) => (filtru === "toate" || rol === filtru) && nume.toLowerCase().includes(cautare));
  document.querySelector("#result-count").textContent = `${rezultate.length} din ${seturi.length} seturi afișate`;
  document.querySelector("#rune-grid").innerHTML = rezultate.map(([nume,piese,bonus,subs,sloturi,rol,nota]) => `
    <article class="rune-card"><header><h3>${esc(nume)}</h3><div class="rune-meta">${piese} ${piese === 1 ? "piesă" : "piese"} · ${esc(labels[rol])}</div></header><dl><dt>Bonus</dt><dd>${esc(bonus)}</dd><dt>Sloturi 2 / 4 / 6</dt><dd>${esc(sloturi)}</dd><dt>Substat-uri căutate</dt><dd>${esc(subs)}</dd></dl><div class="note">${esc(nota)}</div></article>`).join("") || "<p>Nu există seturi care corespund filtrului.</p>";
}

document.querySelector("#slot-table").innerHTML = sloturi.map(s => `<tr>${s.map((v,i) => `<td${i===0?' scope="row"':''}>${v}</td>`).join("")}</tr>`).join("");
document.querySelector("#filters").innerHTML = Object.entries(labels).map(([id,nume]) => `<button class="filter-button ${id === "toate" ? "active" : ""}" data-filter="${id}">${nume}</button>`).join("");
document.querySelector("#search").addEventListener("input", afiseazaSeturi);
document.querySelector("#filters").addEventListener("click", (event) => { const buton = event.target.closest("button"); if (!buton) return; filtru = buton.dataset.filter; document.querySelectorAll(".filter-button").forEach(b => b.classList.toggle("active", b === buton)); afiseazaSeturi(); });
afiseazaSeturi();
