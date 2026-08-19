const express = require("express");
const app = express();
app.use(express.json());
// const port = 3000
let users = []


app.post("/create", (req, res) => {
  // console.log(req.body);
  let body =  req.body
  users.push(body)
  res.send("users saved!!!!");
});

app.get("/", (req, res) => {
  res.send(users);
});

// update
app.put('/update/:id',(req,res)=>{
  let {id} = req.params
  let body = req.body
  let updatedUsers = users.map((val)=> val.id === id ? body : val)
  users = updatedUsers

  res.send("updation happenins.")
})

app.delete('/delete/:id',(req,res)=>{
  let {id} = req.params
  let filterUsers = users.filter((val)=> val.id !== id)
  users= filterUsers
  res.send(users)
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
