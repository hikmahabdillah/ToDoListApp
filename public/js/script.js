import { handleEvents, changeGreeting } from "./eventHandling.js";
import { displayTask, showNumOfTask, onBoarding } from "./taskManagement.js";

document.addEventListener("DOMContentLoaded", () => {
  handleEvents();
  changeGreeting();
  window.onload = function () {
    onBoarding();
    displayTask();
    showNumOfTask();
  };
});
