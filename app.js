const express = require('express');
const app = new express();

const { getTopics } = require('./controller/api-controllers');

app.get("/api/topics", getTopics);

app.all('*', (req, res) => {
    res.status(404).send({msg: "Not found: Path doesnt exist"})
  })

module.exports = app;