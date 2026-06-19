let div=document.querySelector(".bulb")
let btn = document.querySelector("button")

let flag= true
btn.addEventListener("click",()=>{
    div.classList.toggle("yellow")
    if(flag){
         btn.textContent="OFF"
         flag=false
    }else{
         btn.textContent="ON"
         flag=true
    }
})