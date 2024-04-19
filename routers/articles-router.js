const articlesRouter = require('express').Router();
const { 
    getArticles, 
    getArticleById, 
    getCommentsByArticleId, 
    postCommentByArticleId, 
    patchArticleByArticleId
} = require('../controller/api-controllers');

articlesRouter.get('/', getArticles);

articlesRouter
.route('/:article_id')
.get(getArticleById)
.patch(patchArticleByArticleId);

articlesRouter.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(postCommentByArticleId);

module.exports = articlesRouter;