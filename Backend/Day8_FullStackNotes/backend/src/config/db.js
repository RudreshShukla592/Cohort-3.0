const mongoose = require("mongoose")

let connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/practice-notes-app")
         console.log("db connected!!!");
    } catch (error) {
       console.log(error);
        
    }
}

module.exports = connectDb