let div=document.querySelector(".bulb")
let btn = document.querySelector("button")


btn.addEventListener("click",()=>{
    if(div.classList.toggle("yellow")){
         btn.textContent="OFF"
    }else{
         btn.textContent="ON"
    }
})