const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/rightsDB');
        console.log("mongoDB connected ");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;