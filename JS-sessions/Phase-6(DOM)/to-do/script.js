let inp =  document.querySelector("input");
let addBtn = document.querySelector("#add")
let todo = document.querySelector(".todo")
addBtn.addEventListener("click",()=>{
    const val= inp.value
    if(val.trim() === "") return
    todo.innerHTML+=`<div class="li"> 
                <h3>${val}</h3>
                <div>
                   <button class="btn">Edit</button>
                   <button class="btn">Delete</button>
                </div>
            </div> `
    inp.value=""    
})