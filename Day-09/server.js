const express= require('express');
const mongoose= require('mongoose');
const dotenv=require('dotenv');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser =require('cookie-parser');

dotenv.config();
const app=express();

app.use(express.json());
app.use(cookieParser());

const User =require('./User');

const SECRET="mysecretkey";

app.set("view engine", "ejs");
//mongo connect
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoDB connected");
})
.catch((err)=>{
    console.log(err);
});
 
app.get('/',(req,res)=>{
    res.send("full authentication project");
});
app.get('/register',async(req,res)=>{
    const password="Priyanka@123";
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("hashed password:",hashedPassword);
    const newUser=new User({
        name:"prashant",
        email:"abc@123gmail.com",
        password:hashedPassword
    });
    await newUser.save();
    res.send("user registered successfully");
});
app.get("/login",async(req,res)=>{
    const user =await User.findOne({
        email:"abc@123gmail.com"
    });
    if(!user){
        res.send("user not found");

    }
    const isMatch =await bcrypt.compare(
        "Priyanka@123",
        user.password
    );
    if(!isMatch){
        return res.send("wrong password");
    }
    const token=jwt.sign(
        {
        id:user.id,
        email:user.email
     },
        SECRET,
        {
            expiresIn: "1h"
        }
);
res.cookie("token",token);
res.send("Login Successful!!!!!!");
});

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.send("access denied");
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.send("invalid token ");
    }

}
app.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.send({
        message: "protected profile access",
        user: user
    });

});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("logout successful");

});
app.listen(5000,()=>{
    console.log("server running on port 5000");
});
