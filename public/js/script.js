import { handleEvents } from "./eventHandling.js";
import { displayTask, showNumOfTask } from "./taskManagement.js";

document.addEventListener("DOMContentLoaded", () => {
  handleEvents();
  window.onload = function () {
    displayTask();
    showNumOfTask();
  };
});
