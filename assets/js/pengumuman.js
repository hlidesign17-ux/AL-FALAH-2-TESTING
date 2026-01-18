class PengumumanApp {
  constructor(opt) {
    this.container = document.getElementById(opt.containerId);
    this.url = opt.jsonUrl;

    this.listEl = this.container.querySelector(".pengumuman-list");
    this.pagEl = this.container.querySelector(".pengumuman-pagination");

    this.data = [];
    this.page = 1;
    this.perPage = 20;

    this.load();
  }

  async load() {
    try {
      const res = await fetch(this.url);
      this.data = await res.json();

      // urutkan berdasarkan tanggal terbaru
      this.data.sort((a, b) =>
        new Date(b.tanggal) - new Date(a.tanggal)
      );

      this.render();
    } catch (e) {
      console.error("Gagal load pengumuman:", e);
      this.listEl.innerHTML =
        "<p>Gagal memuat data pengumuman</p>";
    }
  }

  render() {
    const total = Math.ceil(this.data.length / this.perPage);
    const start = (this.page - 1) * this.perPage;

    const items = this.data.slice(start, start + this.perPage);

    this.listEl.innerHTML = items
      .map(
        (d) => `
      <div class="pengumuman-item" data-id="${d.id}">
        <div class="pengumuman-title">${d.judul}</div>

        <div class="pengumuman-meta">
          ${this.formatDate(d.tanggal)} •
          <span class="pengumuman-category">${d.kategori}</span>
        </div>
      </div>
    `
      )
      .join("");

    this.renderPag(total);

    // event klik item
    this.listEl
      .querySelectorAll(".pengumuman-item")
      .forEach((el) => {
        el.onclick = () =>
          this.openPopup(el.dataset.id);
      });
  }

  renderPag(total) {
    this.pagEl.innerHTML = "";

    if (total <= 1) return;

    for (let i = 1; i <= total; i++) {
      const b = document.createElement("button");
      b.textContent = i;

      if (i === this.page)
        b.classList.add("active");

      b.onclick = () => {
        this.page = i;
        this.render();

        // scroll ke atas list
        this.container.scrollIntoView({
          behavior: "smooth",
        });
      };

      this.pagEl.appendChild(b);
    }
  }

  openPopup(id) {
    const d = this.data.find((x) => x.id == id);
    if (!d) return;

    let idx = 0;

    const body = document.querySelector(
      ".pengumuman-popup-body"
    );

    const renderSlide = () => {
  body.innerHTML = `
    <h2>${d.judul}</h2>

    <div class="pengumuman-meta" style="margin-bottom:10px">
      ${this.formatDate(d.tanggal)} •
      <span class="pengumuman-category">${d.kategori}</span>
    </div>

    <div class="pengumuman-slider">
      <img src="${d.gambar[idx]}" alt="gambar"/>

      ${
        d.gambar.length > 1
          ? `
        <button class="pengumuman-slide-btn pengumuman-prev">‹</button>
        <button class="pengumuman-slide-btn pengumuman-next">›</button>
      `
          : ""
      }
    </div>

    <div class="pengumuman-narasi" style="margin-top:14px; line-height:1.6">
      ${d.narasi}
    </div>

    <div style="text-align:center;margin-top:16px">
      <button class="pengumuman-btn-close">Tutup</button>
    </div>
  `;

  const prev = body.querySelector(".pengumuman-prev");
  const next = body.querySelector(".pengumuman-next");

  prev?.addEventListener("click", () => {
    idx = (idx - 1 + d.gambar.length) % d.gambar.length;
    renderSlide();
  });

  next?.addEventListener("click", () => {
    idx = (idx + 1) % d.gambar.length;
    renderSlide();
  });

  // event tombol close di bawah
  body
    .querySelector(".pengumuman-btn-close")
    .addEventListener("click", () => {
      document.getElementById("pengumumanPopup").style.display = "none";
    });
};


    renderSlide();

    document.getElementById(
      "pengumumanPopup"
    ).style.display = "block";
  }

  formatDate(t) {
    try {
      return new Date(t).toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return t;
    }
  }
}

// ===== CLOSE POPUP =====
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains(
      "pengumuman-popup-close"
    ) ||
    e.target.classList.contains(
      "pengumuman-popup-overlay"
    )
  ) {
    document.getElementById(
      "pengumumanPopup"
    ).style.display = "none";
  }
});
