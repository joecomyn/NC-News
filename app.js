const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.all('*', (req, res) => {
    res.status(404).send({msg: "Not found: Path doesnt exist"})
  })

app.use((err, req, res, next) => {
    //console.log(err)
    if(err.status && err.msg){
        res.status(err.status).send({ msg: err.msg });
    }
    else if(err.code === '23503'){
        res.status(404).send({msg: `Not Found`})
    }
    else if(err.code === '23502'){
        res.status(400).send({msg: `Bad Request`})
    }
    else if(err.code === '22P02'){
        res.status(400).send({msg: `Bad Request`})
    }
});

module.exports = app;