let toggleBtn = document.querySelector(".theme-toggle");
let themeIcon = document.querySelector(".theme-icon");
let html = document.querySelector("html");

let form = document.querySelector("#task-form");
let task = document.querySelector(".tasks");
let taskCard = document.querySelector(".task-card");

let all = document.querySelector(".all");
let active = document.querySelector(".active");
let done = document.querySelector(".done");

/*
   THEME
 */
toggleBtn.addEventListener("click", () => {
  if (themeIcon.textContent === "🌙") themeIcon.textContent = "☀️";
  else themeIcon.textContent = "🌙";

  let theme = html.getAttribute("data-theme");
  if (theme === "dark") {
    html.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});

let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  savedTheme === "light"
    ? (themeIcon.textContent = "☀️")
    : (themeIcon.textContent = "🌙");
}

let taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
let updateIdx = null;

let ui = () => {
  task.innerHTML = "";
  taskArr.forEach((e, idx) => {
    task.innerHTML += ` <div class="task-card ${e.completed ? "completed" : ""}">
          <div class="task-detail">
            <h3>${e.title}</h3>
            <p>${e.des}</p>
            <span class="priority">${e.priority}</span>
          </div>
          <div class="task-addon">
            <span onclick="doneTask('${e.title}')" class="complete">✅</span>
            <span onclick="updateTask('${e.title}')" class="edit">✏️</span>
            <span onclick="delTask(${idx})" class="delete">🗑️</span>
          </div>
        </div>`;
  });

  /*UPDATION */
  // all
  all.textContent = taskArr.length;

  //done
  let completeTask = taskArr.filter((e) => e.completed === true);
  done.textContent = completeTask.length;

  // active
  let pending = taskArr.filter((e) => e.completed === false);
  active.textContent = pending.length;
};
ui();
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = e.target[0].value;
  let des = e.target[1].value;
  let priority = e.target[2].value;

  let obj = {
    title,
    des,
    priority,
    completed: false,
  };

  if (updateIdx !== null) {
    taskArr[updateIdx] = obj;
    updateIdx = null;
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  } else {
    taskArr.push(obj);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }

  ui();

  form.reset();
});

let delTask = (id) => {
  taskArr.splice(id, 1);
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  ui();
};

let updateTask = (name) => {
  let task = taskArr.find((e) => e.title === name);
  updateIdx = taskArr.findIndex((e) => e.title === name);

  form[0].value = task.title;
  form[1].value = task.des;
  form[2].value = task.priority;
};

let doneTask = (name) => {
  let task = taskArr.find((e) => e.title === name);

  task.completed = !task.completed;
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  ui();
};

var menu = document.querySelector("#ham-bug");
var cross = document.querySelector("#full i");
var tl = gsap.timeline();
tl.to("#full", {
  right: 0,
  duration: 0.5,
});
tl.from("#full h4", {
  x: 150,
  duration: 0.5,
  stagger: 0.3,
  opacity: 0,
});
tl.from("#full i", {
  opacity: 0,
});
tl.pause();
menu.addEventListener("click", function () {
  tl.play();
});
cross.addEventListener("click", function () {
  tl.reverse();
});
