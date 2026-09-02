import express from "express"
import connectDb from "./config/db.config.js"

const app = express()

connectDb()

app.get("/",(req,res)=>{
    res.send("ok")
})

export default app