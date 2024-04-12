document.addEventListener("DOMContentLoaded", () => {
  const btnContinue = document.querySelector(".btn-continue");
  const overlay = document.querySelector(".overlay");
  const back = document.querySelector(".back");
  const btnAdd = document.querySelector(".btn-add");
  const bgcontent = document.querySelector(".bg-overlay-content");

  btnContinue.addEventListener("click", () => {
    overlay.classList.add("disp");
    setTimeout(function () {
      overlay.style.display = "none";
    }, 400);
  });

  btnAdd.addEventListener("click", () => {
    bgcontent.classList.remove("disp");
    bgcontent.style.display = "block";
    setTimeout(function () {
      bgcontent.style.transform = "translateX(0)";
    }, 200);
  });

  back.addEventListener("click", () => {
    bgcontent.style.transform = "translateX(100%)";
    setTimeout(function () {
      bgcontent.style.display = "none";
    }, 400);
  });
});
