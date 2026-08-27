const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rudreshshukla592_db_user:shuklacohort@cohort-cluster0.9n0nbpp.mongodb.net/",
    );
    console.log("db connected!!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb