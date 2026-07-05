function initTodo() {
  let todoForm = document.querySelector(".todo-form");
  let todoList = document.querySelector(".todo-list");
  let taskCount = document.querySelector("#taskCount")

  let taskArr = JSON.parse(localStorage.getItem("tasks")) || [];

  let ui = () => {
    todoList.innerHTML = "";
    taskArr.forEach((e, idx) => {
      todoList.innerHTML += `<li class="todo-item ${e.important ? "important" : ""}" >

              <p class="todo-text">${e.title}</p>

              <div class="todo-actions" >
                <button  class="important-btn" data-id="${idx}">
                  <i class="${e.important ? "ri-star-fill" : "ri-star-line "}"></i>
                </button>

                <button data-id="${idx}" class="delete-btn">
                  <i class="ri-close-line"></i>
                </button>
              </div>
            </li>`;
    });
    
    taskCount.textContent = `${taskArr.length} Tasks`;

  };
  ui()

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = e.target[0].value.trim();;

    if (!title) return;

    let obj = {
      title,
      important: false,
    };

    taskArr.unshift(obj);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    ui();

    todoForm.reset();
  });

  todoList.addEventListener("click",(e)=>{
    const deleteBtn = e.target.closest(".delete-btn")
    const importantBtn = e.target.closest(".important-btn")

    if(deleteBtn){
        let id = deleteBtn.getAttribute("data-id")
        taskArr.splice(id,1)
        localStorage.setItem("tasks", JSON.stringify(taskArr));
        ui()
    }

    if(importantBtn){
        let id = importantBtn.getAttribute("data-id")

        taskArr[id].important = !taskArr[id].important
        localStorage.setItem("tasks", JSON.stringify(taskArr));
        ui() 
    }
  })
}


export default initTodo;
