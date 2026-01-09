const API_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

async function loadDashboard() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const tbody = document.querySelector("#srrTable tbody");
  tbody.innerHTML = "";

  data.forEach(s => {
    const ready = s["STATUS PENGAJIAN"] === "BERJAZAH";
    const row = document.createElement("tr");
    if (ready) row.classList.add("ready");

    row.innerHTML = `
      <td>${s["NO MATRIK"]}</td>
      <td>${s["NAMA PELAJAR"]}</td>
      <td>${s["PROGRAM AKADEMIK"]}</td>
      <td>${s["STATUS PENGAJIAN"]}</td>
      <td style="text-align:center">
        <input type="checkbox" ${ready ? "checked" : ""}
          onchange="updateSRR('${s["NO MATRIK"]}', this.checked)">
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function updateSRR(noMatrik, checked) {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      no_matrik: noMatrik,
      ready_srr: checked ? "BERJAZAH" : "AKTIF"
    })
  });

  loadDashboard();
}

loadDashboard();
