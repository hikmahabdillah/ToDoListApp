document.addEventListener("DOMContentLoaded", () => {
  const btnContinue = document.querySelector(".btn-continue");
  const overlay = document.querySelector(".overlay");
  const back = document.querySelector(".back");
  const backedit = document.querySelector(".back-edit");
  const edit = document.querySelector(".edit");
  const btnAdd = document.querySelector(".btn-add");
  const bgcontent = document.querySelector(".bg-overlay-content");
  const bgdetail = document.querySelector(".bg-overlay-detail");
  const backdetail = document.querySelector(".back-detail");
  const card = document.querySelector(".card");
  const bgeditcontent = document.querySelector(".bg-overlay-content-edit");
  const dropdownHorizon = document.querySelector("#dropdownDotsHorizontal");

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
      bgcontent.style.transform = "translateY(0)";
    }, 200);
  });

  back.addEventListener("click", () => {
    bgcontent.style.transform = "translateY(-100%)";
    setTimeout(function () {
      bgcontent.style.display = "none";
    }, 400);
  });

  card.addEventListener("click", () => {
    bgdetail.classList.remove("disp");
    bgdetail.style.display = "block";
    setTimeout(function () {
      bgdetail.style.transform = "translateY(0)";
    }, 200);
  });

  backdetail.addEventListener("click", () => {
    bgdetail.style.transform = "translateY(100%)";
    setTimeout(function () {
      bgdetail.style.display = "none";
    }, 400);
  });

  // edit.addEventListener("click", () => {
  //   dropdownHorizon.style.display = "none";
  //   bgeditcontent.classList.remove("disp");
  //   bgeditcontent.style.display = "block";
  //   setTimeout(function () {
  //     bgeditcontent.style.transform = "translateX(0)";
  //   }, 200);
  // });

  // backedit.addEventListener("click", () => {
  //   bgeditcontent.style.transform = "translateX(100%)";
  //   setTimeout(function () {
  //     dropdownHorizon.style.display = "block";
  //     bgeditcontent.style.display = "none";
  //   }, 400);
  // });
});
