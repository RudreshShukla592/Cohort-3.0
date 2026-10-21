import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import passport from "./config/passport.js"

const app = express()
app.use(cors({
    origin:""
}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(passport.initialize())

app.use("/api/auth",authRoutes)

export default app

/*
1. why install 2 depedencies like passport passport-google-oauth20 : here passport.js is the main thing but  passport-google-oauth20 is the plug-in for which we need to register like infuture we can add plug-in for github facebook etc. & code for all is almost same. 
 */