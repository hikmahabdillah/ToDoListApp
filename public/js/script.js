import { handleEvents } from "./eventHandling.js";
import { changeGreeting } from "./eventHandling.js";
import { displayTask, showNumOfTask } from "./taskManagement.js";

document.addEventListener("DOMContentLoaded", () => {
  handleEvents();
  changeGreeting();
  window.onload = function () {
    displayTask();
    showNumOfTask();
  };
});
