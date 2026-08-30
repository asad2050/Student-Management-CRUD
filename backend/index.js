const express = require("express")

require("dotenv").config();
const mongoose = require("mongoose")

const app = express();

const DB_URL = process.env.DB_URL;
const PORT = 8000;


mongoose.connect(DB_URL).then(function(){
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    console.log("Mongodb Connected")
  })
})