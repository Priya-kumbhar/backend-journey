const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send("server + DB running ");
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});