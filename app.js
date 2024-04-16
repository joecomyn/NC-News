const express = require('express');
const app = express();

const { getTopics, getEndpoints, getArticles, getArticleById } = require('./controller/api-controllers');

app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById);

app.all('*', (req, res) => {
    res.status(404).send({msg: "Not found: Path doesnt exist"})
  })

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(400).send({ msg: "Bad Request" });
    }
});

module.exports = app;