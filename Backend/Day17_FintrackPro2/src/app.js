import express from "express"
import authRouter from "./routers/auth.routes.js"
import transactionRouter from "./routers/transaction.routes.js"
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/transaction",transactionRouter)

export default app