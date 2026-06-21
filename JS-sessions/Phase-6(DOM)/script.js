let div=document.querySelector(".bulb")
let btn = document.querySelector("button")
let btn2 = document.querySelector(".val")
let inp = document.querySelector("input")

btn.addEventListener("click",()=>{
    if(div.classList.toggle("yellow")){
         btn.textContent="OFF"
    }else{
         btn.textContent="ON"
    }
})

let attr = div.getAttribute("class")
console.log(attr);

btn2.addEventListener("click",()=>{
    console.log(inp.value);
    inp.value=""
})