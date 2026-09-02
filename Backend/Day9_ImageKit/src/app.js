import express from "express"
import connectDb from "./config/db.config.js"
import postRoutes from "./routes/post.routes.js"

const app = express()
app.use(express.json())
connectDb()

app.get("/",(req,res)=>{
    res.send("ok")
})

app.use("/insta",postRoutes)

export default app