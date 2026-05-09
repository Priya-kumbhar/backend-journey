const express = require('express');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articles');

const app = express();

app.use(express.json());

app.use('/articles', articleRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send("server + DB running ");
});

app.get('/test-add', async (req, res) => {
    const Article = require('./models/Article');

    const data = new Article({
        article: "Article 14",
        title: "Equality",
        description: "All are equal before law",
        category: "Fundamental Rights"
    });

    await data.save();

    res.send("Test Data Added");
});
app.get('/add-articles', async (req, res) => {

    const Article = require('./models/Article');

    await Article.insertMany([
        {
            article: "Article 19",
            title: "Freedom of Speech",
            description: "Freedom to express opinions",
            category: "Freedom"
        },
        {
            article: "Article 21",
            title: "Right to Life",
            description: "Protection of life",
            category: "Fundamental Rights"
        },
        {
            article: "Article 25",
            title: "Freedom of Religion",
            description: "Practice any religion",
            category: "Religion"
        },
        {
            article: "Article 15",
            title: "No Discrimination",
            description: "No discrimination based on caste or religion",
            category: "Equality"
        },
        {
            article: "Article 17",
            title: "Abolition of Untouchability",
            description: "Untouchability is banned",
            category: "Social Justice"
        },
        {
            article: "Article 32",
            title: "Right to Constitutional Remedies",
            description: "Move to Supreme Court for rights",
            category: "Legal Rights"
        },
        {
            article: "Article 39A",
            title: "Free Legal Aid",
            description: "Equal justice for all",
            category: "Legal Support"
        },
        {
            article: "Article 23",
            title: "Ban on Human Trafficking",
            description: "Human trafficking prohibited",
            category: "Protection"
        },
        {
            article: "Article 51A",
            title: "Fundamental Duties",
            description: "Duties of citizens",
            category: "Duties"
        }
    ]);

    res.send("10 Articles Added ✅");
});
app.listen(3000, () => {
    console.log("server started on port 3000");
});