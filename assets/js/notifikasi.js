function tutupNotifikasi() {
  const box = document.querySelector(".notifikasi-box");
  box.classList.add("fade-out");

  setTimeout(() => {
    document.getElementById("notifikasi").style.display = "none";
  }, 300);
}
