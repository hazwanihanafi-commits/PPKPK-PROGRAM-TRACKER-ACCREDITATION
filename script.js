<script>
const API_URL = "https://ppkpk-program-tracker-accreditation.onrender.com/";

function groupByProgramme(data) {
  const programmes = {};

  data.forEach(s => {
    const prog = s["PROGRAM AKADEMIK"];

    if (!programmes[prog]) {
      programmes[prog] = {
        name: prog,
        centre: s["ACADEMIC PROGRAM"],
        aktif: 0,
        graduan: 0,
        tangguh: 0,
        pic: s["PENYELIA UTAMA"],
        team: new Set()
      };
    }

    if (s["STATUS PENGAJIAN"] === "AKTIF") programmes[prog].aktif++;
    if (s["STATUS PENGAJIAN"] === "BERIJAZAH") programmes[prog].graduan++;
    if (s["STATUS PENGAJIAN"] === "TANGGUH") programmes[prog].tangguh++;

    programmes[prog].team.add(s["PENYELIA UTAMA"]);
  });

  return programmes;
}

async function loadProgrammeDashboard() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const programmes = groupByProgramme(data);
  const container = document.getElementById("programmeGrid");
  container.innerHTML = "";

  Object.values(programmes).forEach(p => {
    const ready = p.graduan > 0;

    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p class="centre">${p.centre}</p>

        <span class="badge ${ready ? "ready" : "not-ready"}">
          ${ready ? "READY" : "NOT READY"}
        </span>

        <div class="tabs">
          <button class="active">Overview</button>
          <button>COPPA Evidence</button>
          <button>Documents</button>
        </div>

        <p><b>PIC:</b> ${p.pic}</p>
        <p><b>Team:</b> ${[...p.team].join(", ")}</p>

        <p>
          Aktif: ${p.aktif} |
          Graduan: ${p.graduan} |
          Tangguh: ${p.tangguh}
        </p>
      </div>
    `;
  });
}

loadProgrammeDashboard();
</script>
