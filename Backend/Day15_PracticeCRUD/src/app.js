import express from "express"
import notesRouter from "./routes/note.routes.js"

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("all working")
})

app.use("/api/notes",notesRouter)
export default app