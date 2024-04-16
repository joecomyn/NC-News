const { selectTopics, selectArticleById, selectArticles, selectCommentsByArticleId, insertCommentByArticleId } = require('../model/api-models');
const endpoints = require('../endpoints.json');

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

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    if(!Number(article_id)){
        res.status(400).send({msg:"Bad Request: article_id must be a number"});
    }

    selectArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    if(!Number(article_id)){
        res.status(400).send({msg:"Bad Request: article_id must be a number"});
    }
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
    });
};