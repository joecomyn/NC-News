const express = require('express');
const app = express();
const { 
    getTopics, 
    getEndpoints, 
    getArticles, 
    getArticleById, 
    getCommentsByArticleId, 
    postCommentByArticleId, 
    patchArticleByArticleId, 
    removeCommentByCommentId,
    getUsers
} = require('./controller/api-controllers');

app.use(express.json());

app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', patchArticleByArticleId);

app.delete('/api/comments/:comment_id', removeCommentByCommentId);

app.all('*', (req, res) => {
    res.status(404).send({msg: "Not found: Path doesnt exist"})
  })

app.use((err, req, res, next) => {
    //console.log(err)
    if(err.status && err.msg){
        res.status(err.status).send({ msg: err.msg });
    }
    else if(err.code === '23503'){
        res.status(404).send({msg: `Not Found`})
    }
    else if(err.code === '23502'){
        res.status(400).send({msg: `Bad Request`})
    }
    else if(err.code === '22P02'){
        res.status(400).send({msg: `Bad Request`})
    }
});

module.exports = app;