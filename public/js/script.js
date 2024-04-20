document.addEventListener("DOMContentLoaded", () => {
  const btnContinue = document.querySelector(".btn-continue");
  const overlay = document.querySelector(".overlay");
  const back = document.querySelector(".back");
  const backedit = document.querySelector(".back-edit");
  const edit = document.querySelectorAll(".edit");
  const btnAdd = document.querySelector(".btn-add");
  const bgcontent = document.querySelector(".bg-overlay-content");
  const bgdetail = document.querySelector(".bg-overlay-detail");
  const backdetail = document.querySelector(".back-detail");
  const card = document.querySelectorAll(".card");
  const bgeditcontent = document.querySelector(".bg-overlay-update");
  const btnDelete = document.querySelector(".delete-btn");
  const closeBtn = document.querySelector(".close-btn");
  const formAdd = document.getElementById("addTask");
  const formUpdate = document.getElementById("updateTask");
  const tabs = document.querySelectorAll(".tab-option");
  const cardPlace = document.querySelector(".card-place");

  // LOAD TASK FROM LOCAL STORAGE
  function loadTasks() {
    const tasks = localStorage.getItem("TODOOAPPS");
    return tasks ? JSON.parse(tasks) : {};
  }

  document.querySelector(".deleteAll").addEventListener("click", () => {
    localStorage.removeItem("TODOOAPPS");
    cardPlace.innerHTML = "";
    // deleteLocal();
  });
  // function deleteLocal() {
  // }

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
    tasks[id] = { taskName, description, startTime, endTime, isComplete };
    saveTask(tasks);
  }

  // GET ID
  function getTaskById(id) {
    const tasks = loadTasks();
    return tasks[id];
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

  const displayTask = function () {
    const tasks = getTask();

    // Delete all existing tasks before displaying new ones to avoid the duplicated task on cardplace section
    cardPlace.innerHTML = "";

    for (const id in tasks) {
      const task = tasks[id];

      // selection time
      let taskTime;
      if (
        task.startTime.split(":")[0] != 0 &&
        task.endTime.split(":")[0] != 0
      ) {
        taskTime = `
        <span class="time-badge absolute bottom-0 left-0">
          ${task.startTime} ${task.startTime.split(":")[0] < 12 ? "am" : "pm"} -
          ${task.endTime} ${task.endTime.split(":")[0] < 12 ? "am" : "pm"}
        </span>
        `;
      } else {
        taskTime = "";
      }

      // ADD CARD
      const newCard = document.createElement("div");
      newCard.classList.add("card", "relative", "btn-hover", "hover-95");

      newCard.innerHTML = `
        <div class="headCard col-span-2 flex justify-between items-center h-7">
          <span class="status bg-yellow-900 text-yellow-300 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md">Incompleted</span>
          <div class="flex gap-1 p-3 [&>img]:rounded-lg [&>img]:p-1">
            <img src="./img/Edit2.png" class="edit hover:scale-90 hover:ring-orange-400 hover:ring-2 transition-all duration-300" width="35px" alt="">
            <img src="./img/Delete2.png" class="hover:scale-90 hover:ring-orange-400 hover:ring-2 transition-all duration-300" data-modal-target="popup-modal" data-modal-toggle="popup-modal" width="35px" alt="">
          </div>
        </div>
        <h2 class="font-semibold text-[#562D00] text-xl col-span-2 max-w-[80%] mt-2">${task.taskName}</h2>
        <p class="text-gray-600 text-sm col-span-2 line-clamp-2 text-ellipsis max-w-[95%] mb-4">${task.description}</p>
        <div class="flex items-center me-4 col-span-2 justify-self-end">
          <input id="orange-checkbox" type="checkbox" value="" class="w-6 h-6 text-[#FF8400] bg-gray-100 border-gray-300 rounded focus:ring-[#FF8400] dark:focus:ring-[#ff8400ad] focus:ring-2 ">
          <label for="orange-checkbox" class="ms-2 text-sm font-medium text-[#FF8400] dark:text-gray-300">Done</label>
        </div>
          ${taskTime}
      `;

      // APPEND NEW ELEMENT TO PARENT
      cardPlace.appendChild(newCard);
    }
  };

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

  card.forEach((element) => {
    element.addEventListener("dblclick", () => {
      bgdetail.classList.remove("disp");
      bgdetail.style.display = "block";
      setTimeout(function () {
        bgdetail.style.transform = "translateY(0)";
      }, 200);
    });
  });

  backdetail.addEventListener("click", () => {
    bgdetail.style.transform = "translateY(100%)";
    setTimeout(function () {
      bgdetail.style.display = "none";
    }, 400);
  });

  edit.forEach((element) => {
    element.addEventListener("click", () => {
      bgeditcontent.classList.remove("disp");
      bgeditcontent.style.display = "block";
      setTimeout(function () {
        bgeditcontent.style.transform = "translateX(0)";
      }, 200);
    });
  });

  backedit.addEventListener("click", () => {
    bgeditcontent.style.transform = "translateX(100%)";
    setTimeout(function () {
      bgeditcontent.style.display = "none";
    }, 400);
  });

  btnDelete.addEventListener("click", () => {
    // let id = document.querySelector("#id").value;
    bgdetail.style.transform = "translateY(100%)";
    setTimeout(function () {
      bgdetail.style.display = "none";
      document.querySelector("span.alert").textContent =
        "Task has been successfully deleted!";
      document.querySelector("#sticky-banner").style.display = "flex";
      document.querySelector("#sticky-banner").style.opacity = "1";
      document.querySelector("#sticky-banner").classList.remove("hidden");
    }, 400);
  });

  // submitAddBtn.addEventListener("click", () => {

  // });

  formAdd.addEventListener("submit", (event) => {
    addTask();
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

  formUpdate.addEventListener("submit", (event) => {
    event.preventDefault();
    bgeditcontent.style.transform = "translateX(100%)";
    setTimeout(function () {
      bgeditcontent.style.display = "none";
      document.querySelector("span.alert").textContent =
        "Task has been successfully updated!";
      document.querySelector("#sticky-banner").style.display = "flex";
      document.querySelector("#sticky-banner").style.opacity = "1";
      document.querySelector("#sticky-banner").classList.remove("hidden");
    }, 400);
    formUpdate.reset();
  });

  closeBtn.addEventListener("click", () => {
    setTimeout(function () {
      document.querySelector("#sticky-banner").style.display = "none";
    }, 200);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active")); // Hapus kelas aktif dari semua tab
      this.classList.add("active"); // Tambahkan kelas aktif ke tab yang diklik
    });
  });

  window.onload = function () {
    displayTask();
  };
});
