const express = require("express")

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello")
})

const PORT = 8000;


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
  