const express = require("express")
const app = express()
const fileRoute = require("./routes/file.route")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("backend running")
})

app.use("/file",fileRoute)

module.exports = app