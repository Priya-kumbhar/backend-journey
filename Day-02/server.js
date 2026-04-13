const express= require('express');
const app=express();
// middleware 
app.use((req,res,next)=>{
    console.log("middleware running....!");
    next();
});
//home route
app.get('/',(req,res)=>{
    res.send("hello from express");
});

//about route
app.get('/about',(req,res)=>{
    res.send("about page");
});

//start server
app.listen(3000,()=>{
    console.log("server running on http://localhost:3000");
});

