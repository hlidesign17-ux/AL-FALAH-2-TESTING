let students = [];
let currentPage = 1;
const perPage = 20;

const list = document.getElementById("studentList");
const search = document.getElementById("studentSearch");
const pagination = document.getElementById("pagination");

// LOAD JSON
fetch("../prestasi/siswa.json")
  .then((res) => res.json())
  .then((data) => {
    // Ambil array dari JSON apapun bentuknya
    if (Array.isArray(data)) {
      students = data;
    } else {
      // cari array pertama di object
      const firstKey = Object.keys(data)[0];
      students = data[firstKey];
    }

    if (!Array.isArray(students)) {
      console.error("Format JSON salah. Isinya:", data);
      return;
    }

    students.sort((a, b) => a.nama.localeCompare(b.nama));
    render();
  })
  .catch((err) => console.error("Gagal load siswa.json", err));

// RENDER LIST
function render() {
  const keyword = search.value.toLowerCase();

  const filtered = students.filter((s) =>
    s.nama.toLowerCase().includes(keyword)
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);

  list.innerHTML = "";

  pageData.forEach((siswa) => {
    const a = document.createElement("a");
    a.className = "profile-card student-item";
    a.dataset.id = siswa.id; // 🔥 PAKAI ID DARI JSON
    a.textContent = siswa.nama;
    list.appendChild(a);
  });

  // PAGINATION
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      render();
    };
    pagination.appendChild(btn);
  }
}

// SEARCH
search.addEventListener("input", () => {
  currentPage = 1;
  render();
});

// CLICK SISWA → POPUP
document.addEventListener("click", (e) => {
  const card = e.target.closest(".student-item");
  if (!card) return;

  const id = card.dataset.id;

  const siswa = students.find((s) => s.id === id);
  if (!siswa) return;

  showPopup(siswa);
});

// POPUP GENERATOR (PAKAI CSS KAMU)
function showPopup(siswa) {
  const overlay = document.getElementById("profileOverlay");
  const content = document.getElementById("profileContent");

  content.innerHTML = `
  <div class="biodata-layout">
    <div class="biodata-left">
      <div class="biodata-photo-frame">
        <img src="${siswa.foto}" alt="${siswa.nama}">
      </div>

      <h2 class="biodata-name">${siswa.nama}</h2>
      <span class="biodata-role">Siswa Berprestasi</span>
    </div>

    <div class="biodata-right">

      <span style="font-size:30px"><strong>Tingkat Nasional</strong></span>
      <p style="padding-left:10px">
        ${siswa.prestasi.nasional.map((p) => "🏆 " + p).join("<br>")}
      </p>

      <span style="font-size:30px"><strong>Tingkat Provinsi</strong></span>
      <p style="padding-left:10px">
        ${siswa.prestasi.provinsi.map((p) => "🏆 " + p).join("<br>")}
      </p>

      <button class="biodata-back">← Kembali</button>
    </div>
  </div>
  `;

  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
