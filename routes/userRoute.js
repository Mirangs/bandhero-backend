const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');

route.get('/', (req, res) => {
  const sql = `SELECT * from user WHERE login = '${req.query.name}'`;
  executeQuery(sql).spread(user => {
    res.json(user);
  });
});

module.exports = route;