export const bgeditcontent = document.querySelector(".bg-overlay-update");
export const popupModal = document.querySelector(".popup-modal");
export const bgcontent = document.querySelector(".bg-overlay-content");
export const bgdetail = document.querySelector(".bg-overlay-detail");
const overlay = document.querySelector(".overlay");
const btnContinue = document.querySelector(".btn-continue");
const closeBtn = document.querySelector(".close-btn");
const back = document.querySelector(".back");
const btnAdd = document.querySelector(".btn-add");

const backedit = document.querySelector(".back-edit");
const backdetail = document.querySelector(".back-detail");
const closeBtnModal = document.querySelectorAll(".close-popup-btn");
export function handleEvents() {
  // Code for event handling

  const date = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = dayNames[date.getDay()];
  const dayNumber = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day}, ${dayNumber} ${month} ${year}`;

  document.querySelector(".today").textContent = formattedDate;

  // EVENT FOR ANIMATION
  btnContinue.addEventListener("click", () => {
    overlay.classList.add("disp");
    setTimeout(function () {
      overlay.style.display = "none";
    }, 400);
  });

  closeBtn.addEventListener("click", () => {
    setTimeout(function () {
      document.querySelector("#sticky-banner").style.display = "none";
    }, 200);
  });

  closeBtnModal.forEach((close) => {
    close.addEventListener("click", function () {
      popupModal.classList.add("hidden");
    });
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

  backedit.addEventListener("click", () => {
    bgeditcontent.style.transform = "translateX(100%)";
    setTimeout(function () {
      bgeditcontent.style.display = "none";
    }, 400);
  });

  backdetail.addEventListener("click", () => {
    bgdetail.style.transform = "translateY(100%)";
    setTimeout(function () {
      bgdetail.style.display = "none";
    }, 400);
  });
}
export const changeGreeting = () => {
  const greet = document.querySelector("h1.greeting");
  const currentHour = new Date().getHours();

  if (currentHour >= 4 && currentHour < 12) {
    greet.textContent = "Good Morning !";
  } else if (currentHour >= 12 && currentHour < 15) {
    greet.textContent = "Good Afternoon !";
  } else if (currentHour >= 15 && currentHour < 18) {
    greet.textContent = "Good Evening !";
  } else {
    greet.textContent = "Good Night !";
  }
};
