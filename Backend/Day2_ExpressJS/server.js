// let http = require("http")

// let server = http.createServer((req,res)=>{
//     // res.end("Server is running")
//     if(req.url === "/user") res.end("in the users")
//     if(req.url === "/product") res.end("in the products")
//     if(req.url === "/about") res.end("in the about")
// })

// server.listen(3000,()=>{
//     console.log("server running on 3000");
    
// })


const express = require('express');
const app = express()
app.use(express.json())
// const port = 3000

// api
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post("/create",(req,res)=>{

  console.log(req.body);
  

  res.send("ok post")
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
