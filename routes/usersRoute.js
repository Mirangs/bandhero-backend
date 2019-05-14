const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');

route.get('/', (req, res) => {
  const sql = 'SELECT * FROM user';
  executeQuery(sql).spread(users => {
    res.json(users);
  });
});

module.exports = route;