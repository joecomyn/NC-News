const usersRouter = require('express').Router();
const { 
    getUsers
} = require('../controller/api-controllers');

usersRouter.get('/', getUsers);

module.exports = usersRouter;