let createBtn = document.querySelector(".create")
let formDiv = document.querySelector(".form")
let closeBtn = document.querySelector("#close")
let form = document.querySelector("form")
let productDiv = document.querySelector(".products")

createBtn.addEventListener("click",()=>{
    formDiv.style.display="flex"
})

closeBtn.addEventListener("click",()=>{
    formDiv.style.display="none"
})

let products = []

let ui = ()=>{
   productDiv.innerHTML = ""
   products.forEach((e)=>{
    productDiv.innerHTML += ` <div class="product-card">
                <div class="img">
                    <img src="${e.image}" alt="">
                </div>
                <div class="text">
                    <h3>${e.productName}</h3>
                    <p>${e.des}</p>
                    <p>${e.price}</p>
                </div>

                <div class="btns" >
                    <button class="upd">Update</button>
                    <button class="del">Delete</button>
                </div>
            </div>` 
   })
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let productName = event.target[0].value;
  let des = event.target[1].value;
  let price = event.target[2].value;
  let image = event.target[3].value;

  if (
    productName.trim() === "" ||
    des.trim() === "" ||
    price.trim() === "" ||
    image === ""
  ) {
    alert("please fill all the fields");
    return;
  }

  let obj = {
    productName,
    des,
    price,
    image,
  };

  products.push(obj)

  ui();
  console.log(products);
  

  form.reset();

  formDiv.style.display = "none";
});
