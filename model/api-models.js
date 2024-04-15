const db = require("../db/connection");

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics')
        .then(({rows}) => {
            return rows;
        });
};

exports.selectArticleById = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id=$1', [article_id])
    .then(({rows}) => {
        if(rows.length === 0){
           return Promise.reject({
            status: 400,
            msg: "Bad Request"
           });
        }
        return rows[0];
    });
};