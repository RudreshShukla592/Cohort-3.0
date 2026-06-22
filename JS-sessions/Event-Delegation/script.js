const main = document.querySelector("main")
const box = document.querySelector(".box")
const timer = document.querySelector("#timer")
const btn = document.querySelector("button")

let time=0
let interval;

let randomBox = ()=>{
      time+=1
      timer.textContent =time;

      let x = Math.floor(Math.random() * (85-1+1))+1
      let y = Math.floor(Math.random() * (90-1+1))+1

      box.style.top=`${y}%`
      box.style.left=`${x}%` 
}

btn.addEventListener("click",()=>{
        
        // For clearing the interval every time when btn is clicked
    clearInterval(interval);

    interval= setInterval(()=>{
      randomBox();
    },1000);   

    setTimeout(()=>{
        clearInterval(interval);
    },10000)
})