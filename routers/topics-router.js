const topicsRouter = require('express').Router();
const { 
    getTopics
} = require('../controller/api-controllers');

topicsRouter.get('/', getTopics);

module.exports = topicsRouter;