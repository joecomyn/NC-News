const express = require('express');
const app = express();

const { getTopics, getEndpoints } = require('./controller/api-controllers');

app.get("/api/topics", getTopics);

app.get('/api', getEndpoints);

app.all('*', (req, res) => {
    res.status(404).send({msg: "Not found: Path doesnt exist"})
  })

module.exports = app;