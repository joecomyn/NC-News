const { selectTopics, selectArticleById } = require('../model/api-models');
const endpoints = require('../endpoints.json');

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
};

exports.getEndpoints = (req, res, next) => {
    res.status(200).send({ endpoints });
};

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    if(!Number(article_id)) return res.status(400).send({msg:"Bad Request"})

    selectArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch(next);
}