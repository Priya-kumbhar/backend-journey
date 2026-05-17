const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "mysecretkey";
dotenv.config();
const app = express();
app.use(express.json());

const User = require('./User');
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongo connected");
})
.catch((err) => {
    console.log(err);
});
app.get('/', (req, res) => {
    res.send("bcrypt Authentication project");
});

app.get('/register', async (req, res) => {

    const plainPassword = "abcd2";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    console.log("hashed password:", hashedPassword);
    const newUser = new User({
        name: "piyu",
        email: "piyu24@gmail.com",
        password: hashedPassword
    });

    await newUser.save();
    res.send("user registered with hashed password");
});

app.get("/login", async (req, res) => {
    const user = await User.findOne({
        email: "piyu24@gmail.com"
    });

    if (!user) {
        return res.send("User Not Found");
    }
    console.log("DB Password:", user.password);
    const isMatch = await bcrypt.compare("abcd2", user.password);
    console.log("match result:", isMatch);
    if (!isMatch) {
        return res.send("Wrong Password");
    }
    res.send("login successful");
});

app.get("/login", async (req, res) => {
    const user = await User.findOne({
        email: "piyu24@gmail.com"
    });
    if (!user) {
        return res.send("User Not Found");
    }
    const isMatch = await bcrypt.compare("abcd2", user.password);
    if (!isMatch) {
        return res.send("Wrong Password");
    }
    const token = jwt.sign(
        { id: user._id, email: user.email },
        SECRET,
        { expiresIn: "1h" }
    );
    res.send({
        message: "Login Successful",
        token: token
    });

});
app.listen(5000, () => {
    console.log("server running on port 5000");
});
