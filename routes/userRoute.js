const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');

route.post('/', (req, res) => {
  const sql = `SELECT * from user WHERE login = '${req.body.name}'`;
  executeQuery(sql).spread(user => {
    res.json(user);
  });
});

module.exports = route;