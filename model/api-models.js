const db = require("../db/connection");

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics')
        .then(({rows}) => {
            return rows;
        });
};

exports.selectArticleById = (article_id) => {
    console.log('here');
    return db.query('SELECT * FROM articles WHERE article_id=$1', [article_id])
    .then(({rows}) => {
        console.log(rows);
        return rows[0];
    });
};