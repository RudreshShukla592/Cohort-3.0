import express from "express"
import morgan from "morgan"

// express app instance
const app = express()

app.use(morgan("dev"))

export default app