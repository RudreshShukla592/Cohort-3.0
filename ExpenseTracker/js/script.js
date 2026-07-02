let themeSlider = document.querySelector("#theme-toggle");
let html = document.querySelector("html");

themeSlider.addEventListener("change", () => {
  if (themeSlider.checked) {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});
let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);

  if (savedTheme === "dark") {
    themeSlider.checked = true;
  } else {
    themeSlider.checked = false;
  }
}
