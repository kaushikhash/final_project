const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/my_db"

mongoose.connect(url).then((ans) => {
    console.log("ConnectedSuccessful")
  }).catch((err) => {
    console.log("Error in the Connection")
  })

module.exports = {mongoose};