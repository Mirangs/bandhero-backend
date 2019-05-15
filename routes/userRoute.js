const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');
const crypto = require('crypto');

route.post('/', (req, res) => {
  const sql = `SELECT * from user WHERE login = '${req.body.name}'`;
  executeQuery(sql).spread(user => {
    const pass = crypto.createHash('md5').update(req.body.password).digest('hex');
    if (pass === user[0].pass) {
      res.json(user);
    } else {
      res.status(403);
      res.json({ status: 'invalid login or password' });
    }
  });
});

module.exports = route;