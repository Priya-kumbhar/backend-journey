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
//created user 
app.get("/create",async(req,res)=>{
    const user=await User.create({
        name:"piyu",    
        age:21,
        email:"piyu@gmail.com"
    });
    res.send(users);
});
//read user
app.get("/users",async(req,res)=>{
    const users =await User.find();
    res.send(users);
});
//update user 
app.get("/update",async(req,res)=>{
    const userUpdated=await User.findOneAndUpdate(
        {name:"piyu"},
        //udating here 
        {
            age:22,
            email:"piyuuuu@mail.com"
        },
        
        { new:true }
    );
    res.send(userUpdated);
});
app.listen(3000,()=>{
    console.log("server started");
});
