let inp =  document.querySelector("input");
let addBtn = document.querySelector("#add")
let todo = document.querySelector(".todo")

let h3 = document.createElement("h3")
h3.classList.add("h3")
addBtn.addEventListener("click",()=>{
    const val= inp.value
    h3.textContent=val;

    if(val.trim() === "") return

    todo.prepend(h3)

    inp.value=""    
})