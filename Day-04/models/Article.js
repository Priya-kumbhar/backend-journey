const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    article: String,
    title: String,
    description: String,
    category: String
});

module.exports = mongoose.model('Article', articleSchema);