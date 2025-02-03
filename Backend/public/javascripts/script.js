document.querySelectorAll(".flash-parent").forEach((flash) => {
  setTimeout(() => {
    flash.style.display = "none";
  }, 3000);
});
