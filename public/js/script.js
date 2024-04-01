document.addEventListener("DOMContentLoaded", () => {
  const btnContinue = document.querySelector(".btn-continue");
  const overlay = document.querySelector(".overlay");

  btnContinue.addEventListener("click", () => {
    overlay.classList.add("disp");
    setTimeout(function () {
      overlay.style.display = "none";
    }, 400);
  });
});
