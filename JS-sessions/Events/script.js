const form = document.querySelector("form")
const inp1 = document.querySelector("#name")
const inp2 = document.querySelector("#mail")
const users = document.querySelector(".users")

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

form.addEventListener("submit",(events)=>{
    events.preventDefault();
    let name = inp1.value;
    let email = inp2.value
    if(name.trim()==="" && email.trim()==="") return
    users.innerHTML+=`<div class="u-card">
           <div class="img-box">
              <img src="https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
           </div>
           <div>
            <h3  class="text">${name}</h3>
            <h3 class="text">${email}</h3>
           </div>
        </div>`

    form.reset();
})

