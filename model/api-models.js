const db = require("../db/connection");
const { find, forEach } = require("../db/data/test-data/articles");

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;')
        .then(({rows}) => {
            return rows;
        });
};

exports.selectArticleById = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id=$1;', [article_id])
    .then(({rows}) => {
        if(rows.length === 0){
           return Promise.reject({
            status: 404,
            msg: "Not Found: This article_id doesn't exist"
           });
        }
        return rows[0];
    });
};

exports.selectArticles = () => {
    return db.query('SELECT * FROM articles ORDER BY created_at DESC;')
    .then(({rows}) => {
        const commentCountPromises = rows.map((article) => {
            return db.query(`SELECT FROM comments WHERE article_id=$1;`, [article.article_id])
            .then(({rows}) => {
                const articleCopy = {...article, comment_count: rows.length};
                delete articleCopy.body;
                return articleCopy;
            })
        });
    
        return Promise.all(commentCountPromises)
    })
};

exports.selectCommentsByArticleId = (article_id) => {
    return db.query('SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC;', [article_id])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: "Not Found: This article has no comments"
            });
        }
        return rows;
    });
};

exports.insertCommentByArticleId = (comment, article_id) => {
    const { username, body } = comment;
    return db.query('INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;',
    [username, body, article_id])
    .then(({rows}) => {
        return rows[0];
    })
};
