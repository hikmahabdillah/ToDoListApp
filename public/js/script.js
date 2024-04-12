document.addEventListener("DOMContentLoaded", () => {
  const btnContinue = document.querySelector(".btn-continue");
  const overlay = document.querySelector(".overlay");
  const back = document.querySelector(".back");
  const bgcontent = document.querySelector(".bg-overlay-content");

  btnContinue.addEventListener("click", () => {
    overlay.classList.add("disp");
    setTimeout(function () {
      overlay.style.display = "none";
    }, 400);
  });

  back.addEventListener("click", () => {
    bgcontent.classList.add("disp");
    setTimeout(function () {
      bgcontent.style.display = "none";
    }, 400);
  });
});
