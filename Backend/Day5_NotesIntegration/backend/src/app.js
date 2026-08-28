const express = require("express")
const connectDb = require("./config/db")
const cors = require('cors')
const notesRouter = require("./routes/note.routes")

const app = express()
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173"
}))

connectDb()

app.get("/",(req,res)=>{
    res.send("done!, all working")
})

app.use("/notes",notesRouter)

module.exports = app