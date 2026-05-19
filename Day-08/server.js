const express = require('express');
const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');

dotenv.config();
const app=express();
app.use(express.json());
const User=require('./User');
const SECRET="mysecretkey";
//MONGO CONNECTION

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo connected");

})
.catch((err)=>{
    console.log(err);
});

app.get('/',(req,res)=>{
    res.send("jwt authentification project");
});
app.get('/register',async(req,res)=>{
    const password="crispy";
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser=new User({
        name:"prashant",
        email:"abc@gmail.com",
        password:hashedPassword
        
    });
    await newUser.save();
    res.send("user registered successfully");
});

app.get('/login',async(req,res)=>{
    const user=await User.findOne({
        email:"abc@gmail.com"
    });

      if (!user) {
        return res.send("user not found");
    }

    const isMatch = await bcrypt.compare("crispy", user.password);

    if (!isMatch) {
        return res.send("wrong password");
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        SECRET,
        { expiresIn: "1h" }
    );

    res.send({
        message: "login successful",
        token: token
    });

});

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.send("access denied: no token");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        return res.send("invalid token");
    }
}
app.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.send({
        message: "protected profile access",
        user: user
    });
});
app.listen(5000,()=>{
    console.log("server running on port 5000");
});