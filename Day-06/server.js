const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const User = require ('./User');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongo connected");
})
.catch((err) => {
    console.log(err);
});


app.get('/',(req,res)=>{
    res.send("Authentication project");
});

app.get('/register',async(req,res)=>{
       const newUser = new User({
         name: "Priiiiiii",
        email: "priiyaaaa@gmail.com",
        password: "abcd2"
    });

    await newUser.save();
    res.send("User Registered");
});

app.get("/login", async (req, res) => {
    const user = await User.findOne({
        email: "priiyaaaa@gmail.com"
    });
    console.log(user);
    if (!user) {
        return res.send("User Not Found");
    }
    console.log("Stored Password:", user.password);
    if (user.password !== "abcd2") {
        return res.send("Wrong Password");
    }
    res.send("Login Successful");
});
app.listen(5000,()=>{
    console.log("server is running on port 5000");
});
