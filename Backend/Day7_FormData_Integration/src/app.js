const express = require("express");
const app = express();
const cors = require("cors")
const userRoutes = require("./routes/user.route")
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173"
}))

app.get("/", (req, res) => {
 res.send("Backend Running fine shyt!")
});

app.use("/user",userRoutes)

module.exports = app;
