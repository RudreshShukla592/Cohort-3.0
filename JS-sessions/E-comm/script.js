let createBtn = document.querySelector(".create")
let formDiv = document.querySelector(".form")
let closeBtn = document.querySelector("#close")
let form = document.querySelector("form")

createBtn.addEventListener("click",()=>{
    formDiv.style.display="flex"
})

closeBtn.addEventListener("click",()=>{
    formDiv.style.display="none"
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()

})