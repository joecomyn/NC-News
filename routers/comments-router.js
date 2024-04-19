const commentsRouter = require('express').Router();
const { 
    removeCommentByCommentId
} = require('../controller/api-controllers');

commentsRouter.delete('/:comment_id', removeCommentByCommentId);

module.exports = commentsRouter;
