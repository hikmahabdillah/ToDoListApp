import {
  bgcontent,
  bgeditcontent,
  bgdetail,
  popupModal,
} from "./eventHandling.js";

const formAdd = document.getElementById("addTask");
const cardPlace = document.querySelector(".card-place");
const numOfTask = document.querySelector(".num-of-task");
const confirmBtn = document.querySelector(".confirm-popup-btn");
const tabs = document.querySelectorAll(".tab-option");
const bgOverlay = document.querySelector(".bg-overlay");
const overlay = document.querySelector(".overlay");

let activeTab = "incompleted";

// display alert
function displayAlert() {
  document.querySelector("#sticky-banner").style.display = "flex";
  document.querySelector("#sticky-banner").style.opacity = "1";
  document.querySelector("#sticky-banner").classList.remove("hidden");
  setTimeout(function () {
    document.querySelector("#sticky-banner").style.display = "none";
  }, 3000);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabs.forEach((t) => t.classList.remove("active")); // remove  all the classes from each element in array
    this.classList.add("active"); // add active class on button clicked
    activeTab = this.getAttribute("data-tab"); // specify the active tab
    displayTask();
  });
});

// function for show num of task
export function showNumOfTask() {
  const tasks = getTask();
  const lengthOfTask = Object.keys(tasks).length;
  numOfTask.textContent = `${lengthOfTask} Tasks`;
  return lengthOfTask;
}

// FUNCTION TO LOAD ONBOARDING WHEN TASK = 0
export function onBoarding() {
  console.log(`numOfTask : ${showNumOfTask()}`);
  if (showNumOfTask() === 0 || localStorage.getItem("TODOOAPPS") == null) {
    bgOverlay.classList.add("overlay");
    console.log(`Tasks Is Null : ${true}`);
  } else {
    console.log(`Tasks Is Null : ${false}`);
    bgOverlay.style.display = "none";
    bgOverlay.classList.remove("overlay");
  }
}

// LOAD TASK FROM LOCAL STORAGE
function loadTasks() {
  const tasks = localStorage.getItem("TODOOAPPS");
  return tasks ? JSON.parse(tasks) : {};
}

// GET TASK
function getTask() {
  return loadTasks();
}

// SAVE TASK ON LOCAL STORAGE
function saveTask(tasks) {
  localStorage.setItem("TODOOAPPS", JSON.stringify(tasks));
}

// CREATE TASK
function createTask(id, taskName, description, startTime, endTime, isComplete) {
  const tasks = loadTasks();
  tasks[id] = { id, taskName, description, startTime, endTime, isComplete };
  saveTask(tasks);
}

// ADD TASK FEATURE
function addTask() {
  let taskName = document.querySelector('input[name="task-name"]').value;
  let startTime = document.querySelector('input[name="startTime"]').value;
  let endTime = document.querySelector('input[name="endTime"]').value;
  let descriptionTask = document.querySelector(".description").value;
  const id = Date.now().toString();
  createTask(id, taskName, descriptionTask, startTime, endTime, false);
  displayTask();
}

// UPDATE TASK FEATURE
function updateTask(id) {
  let newtaskName = document.querySelector("input#updateTaskName").value;
  let newstartTime = document.querySelector(
    'input[name="updateStartTime"]'
  ).value;
  let newendTime = document.querySelector('input[name="updateEndTime"]').value;
  let newdescriptionTask = document.querySelector(
    "textarea#updateDescription"
  ).value;

  const tasks = getTask();

  if (tasks[id]) {
    tasks[id] = {
      id,
      taskName: newtaskName,
      description: newdescriptionTask,
      startTime: newstartTime,
      endTime: newendTime,
      isComplete: false,
    };
    saveTask(tasks);
    displayTask();
  }

  // close form and display alert when update successful
  bgeditcontent.style.transform = "translateX(100%)";
  bgeditcontent.style.display = "none";
  document.querySelector("span.alert").textContent =
    "Task has been successfully updated!";
  displayAlert();
}

// DELETE TASK FEATURE
function deleteTask(id) {
  // const confirmation = confirm("Are you sure to delete this task?");
  popupModal.classList.remove("hidden");
  popupModal.classList.add("flex");
  document.querySelector(".alert-detail").textContent =
    "Are you sure you want to delete this task?";
  const tasks = getTask();

  confirmBtn.addEventListener("click", function () {
    delete tasks[id];
    saveTask(tasks);
    showNumOfTask();
    displayTask();

    popupModal.classList.add("hidden");
    document.querySelector("span.alert").textContent =
      "Task has been successfully deleted!";
    displayAlert();
  });
}

// ISCOMPLETED
function isCompleted(id) {
  const tasks = getTask();
  tasks[id].isComplete = !tasks[id].isComplete;
  saveTask(tasks);
}

// REMOVE ALL TASK FROM LOCAL STORAGE
document.querySelector(".deleteAll").addEventListener("click", () => {
  popupModal.classList.remove("hidden");
  popupModal.classList.add("flex");

  document.querySelector(".alert-detail").textContent =
    "Are you sure you want to delete All tasks?";
  confirmBtn.addEventListener("click", function () {
    localStorage.removeItem("TODOOAPPS");
    displayTask();
    showNumOfTask();
    // cardPlace.innerHTML = "";
    popupModal.classList.add("hidden");

    document.querySelector("span.alert").textContent =
      "All Tasks has been successfully deleted!";
    displayAlert();
  });
});

export function displayTask() {
  const tasks = getTask();
  // Delete all existing tasks before displaying new ones to avoid the duplicated task on cardplace section
  cardPlace.innerHTML = "";

  // DISPLAY ANIMATION WHEN NO TASK
  const noTaskAnimation = `
  <img src="./img/3d-casual-life-young-man-pointing-on-contract.png" class="animate-updown p-4 drop-shadow-2xl justify-self-center self-center shadow-neutral-900" width="340px" alt="">
  <h2 class="max-w-[80%] text-base justify-self-center self-center font-medium text-center pb-3 pt-8 mt-3 sm:mt-0 text-[#562D00]">There is no task. What do you want to do?</h2>`;

  // IS COMPLETED
  // filter the task by  completed or not
  let filteredTasks = [];
  // if activetab is incompleted, filtered task will be assigned with array of incomplete tasks
  if (activeTab === "incompleted") {
    // filters based on the isComplete property which is false.
    filteredTasks = Object.values(tasks).filter((task) => !task.isComplete);
  } else if (activeTab === "completed") {
    // filters based on the isComplete property which is true.
    filteredTasks = Object.values(tasks).filter((task) => task.isComplete);
  }

  // FOR BETTER DISPLAY WHEN LIST WITH A FEW TASK
  const contain = document.querySelector(".container");

  if (window.innerWidth >= 1024) {
    filteredTasks.length > 0 && filteredTasks.length < 4
      ? contain.classList.add("h-screen")
      : contain.classList.remove("h-screen");
  } else {
    filteredTasks.length > 0 && filteredTasks.length < 2
      ? contain.classList.add("h-screen")
      : contain.classList.remove("h-screen");
  }

  // if filtered task has length === 0
  if (filteredTasks.length === 0) {
    // cardPlace.innerHTML = `<h2 class="max-w-[80%] text-base justify-self-center self-center font-medium text-center pb-3 text-[#562D00]">No Tasks found in this category</h2>`;
    cardPlace.innerHTML = noTaskAnimation;
  } else {
    // ADD CARD
    // display all task based on filteredTasks
    filteredTasks.forEach((task) => {
      let taskTime;
      // selection time
      if (task.startTime !== "00:00" || task.endTime !== "00:00") {
        taskTime = `
        <span class="time-badge absolute bottom-0 left-0">
          ${task.startTime} ${task.startTime.split(":")[0] < 12 ? "am" : "pm"} -
          ${task.endTime} ${task.endTime.split(":")[0] < 12 ? "am" : "pm"}
        </span>
        `;
      } else {
        taskTime = "";
      }

      const newCard = document.createElement("div");
      newCard.classList.add("card", "relative", "btn-hover", "hover-95");
      newCard.setAttribute("data-id", task.id);
      newCard.innerHTML = `
       <div class="headCard col-span-2 flex justify-between items-center h-7">
         <span class="status bg-[#FDDE55] text-yellow-900 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md">Incompleted</span>
         <div class="flex items-center gap-1 py-3 [&>img]:rounded-lg [&>img]:p-1">
           <img src="./img/pencil.webp" data-id="${task.id}" class="edit hover:scale-90 hover:ring-orange-400 hover:ring-2 transition-all duration-300" width="40px" height="40px" alt="">
           <img src="./img/delete 2.webp" data-id="${task.id}" class="delete-icon max-h-[35px] hover:scale-90 hover:ring-orange-400 hover:ring-2 transition-all duration-300" width="35px" alt="">
         </div>
       </div>
       <h2 class="font-semibold text-[#562D00] text-xl col-span-2 max-w-[80%] mt-2">${task.taskName}</h2>
       <span class="line-clamp-2 text-ellipsis col-span-2 max-w-[95%] mb-4"> 
       <p class="text-gray-600 text-sm ">${task.description}</p>
       </span>
       <div class="flex items-center me-1 col-span-2 justify-self-end">
         <input id="completed-checkbox-${task.id}" type="checkbox" class="complete-checkbox w-6 h-6 text-[#FF8400] bg-gray-100 border-gray-300 rounded focus:ring-[#FF8400] dark:focus:ring-[#ff8400ad] focus:ring-2 ">
         <label for="completed-checkbox-${task.id}" class="ms-2 text-sm font-medium text-[#FF8400] dark:text-gray-300">Done</label>
       </div>
         ${taskTime}
     `;

      const statusCheck = newCard.querySelector("span.status");
      const completedCheck = newCard.querySelectorAll(".complete-checkbox");
      completedCheck.forEach((check) => {
        check.addEventListener("change", function () {
          let isChecked = check.checked;
          if (this.checked) {
            isCompleted(task.id);
            statusCheck.textContent = "Completed";
          } else {
            isCompleted(task.id);
            statusCheck.textContent = "InCompleted";
          }
        });
        if (task.isComplete == true) {
          check.checked = task.isComplete;
          statusCheck.textContent = "Completed";
        } else {
          check.checked = task.isComplete;
          statusCheck.textContent = "InCompleted";
        }
      });

      // detail
      newCard.addEventListener("dblclick", () => {
        showTaskDetail(task.id);
      });

      // update
      const updateIcon = newCard.querySelectorAll(".edit");
      const formUpdate = document.getElementById("updateTask");

      updateIcon.forEach((updateBtn) => {
        updateBtn.addEventListener("click", () => {
          // get id from each of task
          const taskId = updateBtn.getAttribute("data-id");
          // get task data of selected task
          const task = tasks[taskId];

          // reassign value of field on form update
          document.querySelector("input#updateTaskName").value = task.taskName;
          document.querySelector('input[name="updateStartTime"]').value =
            task.startTime;
          document.querySelector('input[name="updateEndTime"]').value =
            task.endTime;
          document.querySelector("textarea#updateDescription").value =
            task.description;
          document.getElementById("updateTaskId").value = taskId;

          // display form update
          bgeditcontent.classList.remove("disp");
          bgeditcontent.style.display = "block";
          setTimeout(function () {
            bgeditcontent.style.transform = "translateX(0)";
          }, 200);
        });

        formUpdate.addEventListener("submit", (event) => {
          event.preventDefault();

          //get the task id value that will be updated
          const taskId = document.getElementById("updateTaskId").value;
          updateTask(taskId);
        });

        // delete
        const deleteIcon = newCard.querySelectorAll(".delete-icon");
        deleteIcon.forEach((delBtn) => {
          delBtn.addEventListener("click", () => {
            // get id from each of task
            const taskId = delBtn.getAttribute("data-id");
            // remove card when delete button is clicked
            deleteTask(taskId);
          });
        });
      });

      cardPlace.appendChild(newCard);
    });
  }
}

// Display task detail
function showTaskDetail(taskId) {
  const tasks = loadTasks();
  const task = tasks[taskId]; // Get the correct task data

  let taskTime;
  // selection time
  if (task.startTime !== "00:00" || task.endTime !== "00:00") {
    taskTime = `
          ${task.startTime} ${task.startTime.split(":")[0] < 12 ? "am" : "pm"} -
          ${task.endTime} ${task.endTime.split(":")[0] < 12 ? "am" : "pm"}
        `;
  } else {
    taskTime = "";
  }

  // Set the detail values
  const detailTitle = document.querySelector(".detail-title");
  const detailDescription = document.querySelector(".detail-description");
  const detailDescriptionArea = document.querySelector(
    ".description-detail-area"
  );
  const detailTime = document.querySelector(".detail-time");
  const detailStatus = document.querySelector(".detail-status");

  if (task.description === "") {
    detailDescriptionArea.classList.add("hidden");
  } else {
    detailDescriptionArea.classList.remove("hidden");
  }

  detailTitle.textContent = task.taskName;
  detailDescription.textContent = task.description;
  detailTime.textContent = `${taskTime}`;
  if (task.isComplete == true) {
    detailStatus.textContent = "Completed";
  } else {
    detailStatus.textContent = "InCompleted";
  }

  bgdetail.classList.remove("disp");
  bgdetail.style.display = "block";
  setTimeout(function () {
    bgdetail.style.transform = "translateY(0)";
  }, 200);
}

formAdd.addEventListener("submit", (event) => {
  addTask();
  showNumOfTask();
  event.preventDefault();
  bgcontent.style.transform = "translateY(-100%)";
  bgcontent.style.display = "none";
  document.querySelector("span.alert").textContent =
    "Task has been successfully added!";
  displayAlert();
  formAdd.reset();
});
