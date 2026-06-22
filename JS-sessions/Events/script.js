let userData=[
  {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "dob": "2001-05-14",
    "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    "id": 2,
    "name": "Priya Verma",
    "email": "priya.verma@example.com",
    "dob": "1999-11-22",
    "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    "id": 3,
    "name": "Rohan Gupta",
    "email": "rohan.gupta@example.com",
    "dob": "2002-02-08",
    "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  },
  {
    "id": 4,
    "name": "Sneha Patel",
    "email": "sneha.patel@example.com",
    "dob": "2000-07-30",
    "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  },
  {
    "id": 5,
    "name": "Karan Singh",
    "email": "karan.singh@example.com",
    "dob": "2001-09-18",
    "image": "https://images.unsplash.com/photo-1504593811423-6dd665756598"
  }
]
let form = document.querySelector(("form"))
let inp1= document.querySelector("#name")
let inp2= document.querySelector("#mail")
let users = document.querySelector(".users")
let url = document.querySelector("#url")

let delBtn = (idx)=>{
    userData.splice(idx,1)
    ui()
}
let ui = ()=>{
     users.innerHTML=""
    userData.forEach((elem,index)=>{
        users.innerHTML+=`<div class="u-card">
            <div class="img-box">
                <img src="${elem.image}" alt="">
            </div>
            <h3 class="text">${elem.name}</h3>
            <h3 class="text">${elem.email}</h3>
            <button onclick="delBtn(${index})" class="del">Delete</button>
        </div>`
    })
}
ui()

form.addEventListener("submit",(events)=>{
    // users.innerHTML=""
    events.preventDefault();
    let name = inp1.value
    let email=inp2.value
    let image = url.value

    if(name.trim()==="" && email.trim()==="" && image.trim()==="") return

    userData.push({
        name,
        email,
        image
    })
    ui()

    form.reset()

})

// <button onclick="${delBtn(index)}" class="del">Delete</button>