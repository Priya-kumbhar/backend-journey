const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Add article
router.post('/add', async (req, res) => {
    const article = new Article(req.body);
    await article.save();
    res.send("Article Added ✅");
});

router.get('/all', async (req, res) => {
    try {
        const articles = await Article.find();

        res.json(articles);
    } catch (error) {
        res.send(error);
    }
});
module.exports = router;
