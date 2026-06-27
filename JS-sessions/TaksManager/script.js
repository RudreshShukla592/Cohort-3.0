let toggleBtn = document.querySelector(".theme-toggle")
let themeIcon = document.querySelector(".theme-icon")
let html = document.querySelector("html")
let form = document.querySelector("#task-form")
let task = document.querySelector(".tasks")
let taskCard = document.querySelector(".task-card")
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

let taskArr = []
let updateIdx = null;

let ui = ()=>{
    task.innerHTML=""
    taskArr.forEach((e,idx)=>{
        task.innerHTML+=` <div class="task-card">
          <div class="task-detail">
            <h3>${e.title}</h3>
            <p>${e.des}</p>
            <span class="priority">${e.priority}</span>
          </div>
          <div class="task-addon">
            <span class="complete">✅</span>
            <span onclick="updateTask('${e.title}')" class="edit">✏️</span>
            <span onclick="delTask(${idx})" class="delete">🗑️</span>
          </div>
        </div>`
    })
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    let title = e.target[0].value
    let des = e.target[1].value
    let priority = e.target[2].value

    let obj = {
        title,
        des,
        priority,
    }

    if(updateIdx !== null){
        taskArr[updateIdx] = obj 
        updateIdx = null
    }else{
        taskArr.push(obj)
    }
    
    ui()

    form.reset()
})

let delTask = (id)=>{
    taskArr.splice(id,1)
    ui()
}

let updateTask = (name)=>{
   let task = taskArr.find((e)=> e.title === name);
   updateIdx = taskArr.findIndex((e)=> e.title === name)

   form[0].value = task.title;
   form[1].value = task.des;
   form[2].value = task.priority;
}