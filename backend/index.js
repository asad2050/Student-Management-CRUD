const express = require("express")

require("dotenv").config();
const mongoose = require("mongoose")
const cors = require('cors')
const userRoutes = require('./routes/user.routes')


const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/student_management" ;
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors())
app.use(express.json());

userRoutes(app);


mongoose.connect(DB_URL).then(function(){
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    console.log("Mongodb Connected")
  })
})