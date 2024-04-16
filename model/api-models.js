const db = require("../db/connection");
const { find, forEach } = require("../db/data/test-data/articles");

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

exports.selectArticles = () => {
    return db.query('SELECT * FROM articles')
    .then(({rows}) => {
        return rows;
    })
};

exports.countAllComments = (articles) => {
    const getCommentCountPromises = articles.map((article) => {
        return db.query(`SELECT FROM comments WHERE article_id=${article.article_id}`)
        .then(({rows}) => {
            return {...article, comment_count: rows.length};
        })
    });

    return Promise.all(getCommentCountPromises)
};