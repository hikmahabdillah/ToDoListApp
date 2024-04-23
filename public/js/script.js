document.addEventListener("DOMContentLoaded", () => {
  const btnContinue = document.querySelector(".btn-continue");
  const overlay = document.querySelector(".overlay");
  const closeBtn = document.querySelector(".close-btn");
  const back = document.querySelector(".back");
  const btnAdd = document.querySelector(".btn-add");
  const bgcontent = document.querySelector(".bg-overlay-content");
  const formAdd = document.getElementById("addTask");
  const cardPlace = document.querySelector(".card-place");
  const tabs = document.querySelectorAll(".tab-option");
  const numOfTask = document.querySelector(".badge");

  const backedit = document.querySelector(".back-edit");
  // const edit = document.querySelectorAll(".edit");
  // const bgdetail = document.querySelector(".bg-overlay-detail");
  // const backdetail = document.querySelector(".back-detail");
  // const card = document.querySelectorAll(".card");
  const bgeditcontent = document.querySelector(".bg-overlay-update");
  // const btnDelete = document.querySelector(".delete-btn");

  let activeTab = "incompleted";

  function showNumOfTask() {
    const tasks = getTask();
    const lengthOfTask = Object.keys(tasks).length;
    numOfTask.textContent = `${lengthOfTask} Tasks`;
  }

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

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active")); // Hremove  all the classes from each element in array
      this.classList.add("active"); // add active class on button clicked
      activeTab = this.getAttribute("data-tab"); // specify the active tab
      displayTask();
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
  function createTask(
    id,
    taskName,
    description,
    startTime,
    endTime,
    isComplete
  ) {
    const tasks = loadTasks();
    tasks[id] = { id, taskName, description, startTime, endTime, isComplete };
    saveTask(tasks);
  }

  // // GET ID
  // function getTaskById(id) {
  //   const tasks = loadTasks();
  //   return tasks[id];
  // }

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
    let newendTime = document.querySelector(
      'input[name="updateEndTime"]'
    ).value;
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
    setTimeout(function () {
      bgeditcontent.style.display = "none";
      document.querySelector("span.alert").textContent =
        "Task has been successfully updated!";
      document.querySelector("#sticky-banner").style.display = "flex";
      document.querySelector("#sticky-banner").style.opacity = "1";
      document.querySelector("#sticky-banner").classList.remove("hidden");
    }, 400);
  }

  // DELETE TASK FEATURE
  function deleteTask(id) {
    const confirmation = confirm("Are you sure to delete this task?");
    if (confirmation) {
      const tasks = getTask();
      delete tasks[id];
      saveTask(tasks);
      showNumOfTask();
      displayTask();
    }
  }

  // ISCOMPLETED
  function isCompleted(id) {
    const tasks = getTask();
    tasks[id].isComplete = !tasks[id].isComplete;
    saveTask(tasks);
  }

  // REMOVE ALL TASK FROM LOCAL STORAGE
  document.querySelector(".deleteAll").addEventListener("click", () => {
    const confirmation = confirm(
      "Apakah Anda yakin ingin menghapus semua tugas?"
    );
    if (confirmation) {
      localStorage.removeItem("TODOOAPPS");
      displayTask();
      showNumOfTask();
      // cardPlace.innerHTML = "";
    }
  });

  function displayTask() {
    const tasks = getTask();
    // Delete all existing tasks before displaying new ones to avoid the duplicated task on cardplace section
    cardPlace.innerHTML = "";

    // DISPLAY ANIMATION WHEN NO TASK
    const noTaskAnimation = `
    <img src="./img/3d-isometric-research-of-statistical-data-and-analytics.gif" class=" drop-shadow-2xl justify-self-center self-center shadow-neutral-900" width="330px" alt="">
    <h2 class="max-w-[80%] text-base justify-self-center self-center font-medium text-center pb-3 pt-8 mt-3 sm:mt-0 text-[#562D00]">There is no task. What do you want to do?</h2>`;

    // selection time
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
    console.log(filteredTasks);

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
            ${task.startTime} ${
            task.startTime.split(":")[0] < 12 ? "am" : "pm"
          } -
            ${task.endTime} ${task.endTime.split(":")[0] < 12 ? "am" : "pm"}
          </span>
          `;
        } else {
          taskTime = "";
        }

        const newCard = document.createElement("div");
        newCard.classList.add("card", "relative", "btn-hover", "hover-95");
        newCard.innerHTML = `
         <div class="headCard col-span-2 flex justify-between items-center h-7">
           <span class="status bg-yellow-900 text-yellow-300 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md">Incompleted</span>
           <div class="flex gap-1 p-3 [&>img]:rounded-lg [&>img]:p-1">
             <img src="./img/Edit2.png" data-id="${task.id}" class="edit hover:scale-90 hover:ring-orange-400 hover:ring-2 transition-all duration-300" width="35px" alt="">
             <img src="./img/Delete2.png" class="delete-icon hover:scale-90 hover:ring-orange-400 hover:ring-2 transition-all duration-300" width="35px" alt="">
           </div>
         </div>
         <h2 class="font-semibold text-[#562D00] text-xl col-span-2 max-w-[80%] mt-2">${task.taskName}</h2>
         <p class="text-gray-600 text-sm col-span-2 line-clamp-2 text-ellipsis max-w-[95%] mb-4">${task.description}</p>
         <div class="flex items-center me-4 col-span-2 justify-self-end">
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
              console.log(`check ${task.id} : `, isChecked);
              isCompleted(task.id);
              statusCheck.textContent = "Completed";
            } else {
              console.log(`check ${task.id} : `, isChecked);
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
            document.querySelector("input#updateTaskName").value =
              task.taskName;
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
          const deleteIcon = newCard.querySelector(".delete-icon");
          deleteIcon.addEventListener("click", () => {
            deleteTask(task.id);
          });

          // APPEND NEW ELEMENT TO PARENT
          // cardPlace.appendChild(newCard);
        });

        cardPlace.appendChild(newCard);
      });
    }
  }

  // card.forEach((element) => {
  //   element.addEventListener("dblclick", () => {
  //     bgdetail.classList.remove("disp");
  //     bgdetail.style.display = "block";
  //     setTimeout(function () {
  //       bgdetail.style.transform = "translateY(0)";
  //     }, 200);
  //   });
  // });

  // backdetail.addEventListener("click", () => {
  //   bgdetail.style.transform = "translateY(100%)";
  //   setTimeout(function () {
  //     bgdetail.style.display = "none";
  //   }, 400);
  // });

  // edit.forEach((element) => {
  //   element.addEventListener("click", () => {
  //     bgeditcontent.classList.remove("disp");
  //     bgeditcontent.style.display = "block";
  //     setTimeout(function () {
  //       bgeditcontent.style.transform = "translateX(0)";
  //     }, 200);
  //   });
  // });

  // btnDelete.addEventListener("click", () => {
  //   // let id = document.querySelector("#id").value;
  //   bgdetail.style.transform = "translateY(100%)";
  //   setTimeout(function () {
  //     bgdetail.style.display = "none";
  //     document.querySelector("span.alert").textContent =
  //       "Task has been successfully deleted!";
  //     document.querySelector("#sticky-banner").style.display = "flex";
  //     document.querySelector("#sticky-banner").style.opacity = "1";
  //     document.querySelector("#sticky-banner").classList.remove("hidden");
  //   }, 400);
  // });

  formAdd.addEventListener("submit", (event) => {
    addTask();
    showNumOfTask();
    event.preventDefault();
    bgcontent.style.transform = "translateY(-100%)";
    setTimeout(function () {
      bgcontent.style.display = "none";
      document.querySelector("span.alert").textContent =
        "Task has been successfully added!";
      document.querySelector("#sticky-banner").style.display = "flex";
      document.querySelector("#sticky-banner").style.opacity = "1";
      document.querySelector("#sticky-banner").classList.remove("hidden");
    }, 400);
    formAdd.reset();
  });

  window.onload = function () {
    displayTask();
    showNumOfTask();
  };
});
