const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route")
app.use(express.json())

app.get("/", (req, res) => {
 res.send("Backend Running fine shyt!")
});

app.use("/user",userRoutes)

module.exports = app;
