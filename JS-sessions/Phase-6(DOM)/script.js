let div=document.querySelector(".bulb")
let btn = document.querySelector("button")

btn.addEventListener("click",()=>{
    div.classList.toggle("yellow")
})