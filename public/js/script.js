import { handleEvents, changeGreeting } from "./eventHandling.js";
import { displayTask, showNumOfTask, onBoarding } from "./taskManagement.js";

document.addEventListener("DOMContentLoaded", () => {
  handleEvents();
  changeGreeting();
  window.onload = function () {
    setTimeout(() => {
      onBoarding();
    }, 1000);
    displayTask();
    showNumOfTask();
  };
});
