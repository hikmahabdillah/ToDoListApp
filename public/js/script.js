import { handleEvents, changeGreeting } from "./eventHandling.js";
import { displayTask, showNumOfTask, onBoarding } from "./taskManagement.js";

document.addEventListener("DOMContentLoaded", () => {
  handleEvents();
  changeGreeting();
  window.onload = function () {
    displayTask();
    showNumOfTask();
  };
  window.addEventListener("load", () => {
    // if page is fully loaded, remove preloader
    onBoarding();
  });
});
