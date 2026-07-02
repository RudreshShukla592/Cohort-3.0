let themeSlider = document.querySelector("#theme-toggle")
let html = document.querySelector("html");

themeSlider.addEventListener("change",()=>{
  let theme = html.getAttribute("data-theme");
  if (theme === "dark") {
    html.setAttribute("data-theme", "light");
    
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
   
    localStorage.setItem("theme", "dark");
  }
})
let savedTheme = localStorage.getItem("theme");
if(savedTheme){
    html.setAttribute("data-theme", savedTheme);
}