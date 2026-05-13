const express=require('express');
const mongoose = require ('mongoose');
const User=require('./models/User');

const app=express();
mongoose.connect("mongodb://127.0.0.1:27017/mydb")
.then(()=>{
    console.log("Mongodb connected");
})
.catch((err)=>{
    console.log(err);
});

app.get("/",(req,res)=>{
    res.send("Server running");

});
app.get("/create",async(req,res)=>{
    const user=await User.create({
        name:"piyu",    
        age:21,
        email:"piyu@gmail.com"
    });
    res.send(user);
});
app.listen(3000,()=>{
    console.log("server started");
});
