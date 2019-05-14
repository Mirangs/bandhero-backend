const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');

route.get('/', (req, res) => {
  const sql = `SELECT * FROM news`;
  executeQuery(sql).spread(news => {
    res.setHeader('content-type', 'application/json');
    res.json(news);
  });
});

module.exports = route;