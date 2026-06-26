let toggleBtn = document.querySelector(".theme-toggle")
let themeIcon = document.querySelector(".theme-icon")
let html = document.querySelector("html")
let form = document.querySelector("#task-form")

/*
   THEME
 */
toggleBtn.addEventListener("click",()=>{
    if(themeIcon.textContent === "🌙") themeIcon.textContent = "☀️"
    else themeIcon.textContent = "🌙"
    
    let theme = html.getAttribute("data-theme")
    if(theme === "dark") html.setAttribute("data-theme","light")
    else html.setAttribute("data-theme","dark")
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log("submitted");
    
    form.reset()
})