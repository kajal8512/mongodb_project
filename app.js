const express = require("express")
const mongoose = require("mongoose")
const app = express();
// const jwt = require("jsonwebtoken")
const url = "mongodb://localhost:27017/mongodb";
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on("open",function(){
    console.log("connected");
})

// console.log(mongoose);

// middleware
app.use(express.json())

// Route middleware
const routers = require("./routes/routes")
app.use("/",routers)

app.listen(6000,()=>{
    console.log("server started");
})

module.exports = routers
