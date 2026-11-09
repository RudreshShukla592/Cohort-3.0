import express from "express"
import authRouter from "./routers/auth.routes.js"
import cookieParser from "cookie-parser"
import postRouter from "./routers/post.routes.js"

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/posts", postRouter);

export default app