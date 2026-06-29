var menu = document.querySelector("#ham-bug");
var cross = document.querySelector("#full i");
var tl = gsap.timeline();
tl.to("#full",{
    right:0,
    duration:0.5
})
tl.from("#full h4",{
    x:150,
    duration:0.5,
    stagger:0.3,
    opacity:0
})
tl.from("#full i",{
    opacity:0
})
tl.pause()
menu.addEventListener("click",function(){
    tl.play();
})
cross.addEventListener("click",function(){
    tl.reverse();
})



const bubbleBtn = document.querySelector(".bubble-btn");
const captureBtn = document.querySelector(".capture-btn");
const output = document.querySelector(".output");

const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

// Remove previous highlights
function resetHighlight() {
    [grandparent, parent, child].forEach((el) => {
        el.style.background = "rgba(255,255,255,.04)";
        el.style.color = "white";
    });

    child.style.background =
        "linear-gradient(135deg,var(--accent),var(--text-secondary))";
}

// Highlight animation
function highlight(element, text, delay) {
    setTimeout(() => {
        element.style.background = "#22c55e";
        element.style.color = "#fff";
        output.textContent = text;
    }, delay);
}


// Event Bubbling 


bubbleBtn.addEventListener("click", () => {
    resetHighlight();

    highlight(child, "Child clicked", 0);
    highlight(parent, "Parent receives event", 800);
    highlight(grandparent, "Grandparent receives event", 1600);

    setTimeout(() => {
        output.textContent =
            "Bubbling Order: Child → Parent → Grandparent";
    }, 2400);
});


// Event Capturing

captureBtn.addEventListener("click", () => {
    resetHighlight();

    highlight(grandparent, "Grandparent captures event", 0);
    highlight(parent, "Parent captures event", 800);
    highlight(child, "Child receives event", 1600);

    setTimeout(() => {
        output.textContent =
            "Capturing Order: Grandparent → Parent → Child";
    }, 2400);
});