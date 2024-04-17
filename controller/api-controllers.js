const endpoints = require('../endpoints.json');
const { selectTopics, 
    selectArticleById, 
    selectArticles, 
    selectCommentsByArticleId, 
    insertCommentByArticleId, 
    updateArticleByArticleId, 
    deleteCommentByCommentId, 
    selectUsers 
} = require('../model/api-models');

exports.getEndpoints = (req, res, next) => {
    res.status(200).send({ endpoints });
};

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
};

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((articles) => {
        res.status(200).send({ articles: articles })
    })
};

exports.getUsers = (req, res, next) => {
    selectUsers()
    .then((users) => {
        res.status(200).send({ users })
    })
};

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    //invokes selectArticleById first to use its error handling to handle non existing article_ids
    selectArticleById(article_id)
    .then((article) => {
        return selectCommentsByArticleId(article.article_id);
    })
    .then((comments) => {
        res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    insertCommentByArticleId(req.body, article_id)
    .then((postedComment) => {
        res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.patchArticleByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    updateArticleByArticleId(inc_votes, article_id)
    .then((patchedArticle) => {
        res.status(200).send({ patchedArticle })
    })
    .catch(next);
};

exports.removeCommentByCommentId = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentByCommentId(comment_id)
    .then(() => {
        res.status(204).send();
    })
    .catch(next);
};