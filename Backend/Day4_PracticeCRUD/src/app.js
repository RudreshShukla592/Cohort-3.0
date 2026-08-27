const express = require("express")
const connectDb = require("./config/db")
const notesRouter = require("./routes/note.routes")

const app = express()
app.use(express.json());
connectDb()

app.get("/",(req,res)=>{
    res.send("done!, all working")
})

app.use("/notes",notesRouter)

module.exports = app