import initTodo from "./todo.js";
import initPlanner from "./planner.js";
import initGoal from "./goal.js";
import initTimer from "./timer.js";
import initQuote from "./quote.js";
import initClock from "./clock.js";
import initWeather from "./weather.js";

let themeBtn = document.querySelector(".theme-toggle");
let html = document.querySelector("html");

// theme toggle
themeBtn.addEventListener("click", () => {
  let theme = html.getAttribute("data-theme");
  if (theme === "dark") {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});


const sections = document.querySelectorAll(".page");
const featureBtns = document.querySelectorAll(".feature-card");
let home = document.querySelector(".home");

function showElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}

featureBtns.forEach((btns) => {
  btns.addEventListener("click", () => {
    let selectedPage = btns.getAttribute("data-feature");
    let page = document.querySelector(`.${selectedPage}`);

    hideElement(home);
    sections.forEach((section) => {
      hideElement(section);
    });
    showElement(page);
  });
});

let backArrow = document.querySelectorAll(".backArrow");
backArrow.forEach((btns) => {
  btns.addEventListener("click", () => {
    let selectedPage = btns.getAttribute("data-feature");
    let page = document.querySelector(`.${selectedPage}`);

    showElement(home);
    hideElement(page);
  });
});


/*all logic*/

initTodo();
initPlanner();
initGoal();
initTimer();
initQuote();
initClock();
initWeather();