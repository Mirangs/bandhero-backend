const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');
const crypto = require('crypto');

const authUser = (req, res) => {
  const sql = `SELECT * from user WHERE login = '${req.body.name}'`;
  executeQuery(sql).spread(user => {
    const pass = crypto.createHash('md5').update(req.body.pass).digest('hex');
    if (pass === user[0].pass) {
      res.status(200);
      res.json(user);
    } else {
      res.status(403);
      res.json({ status: 403, message: 'invalid login or password' });
    }
  });
}

route.post('/', (req, res) => {
  const sqlExists = `SELECT EXISTS(SELECT id FROM user_main WHERE login = '${req.body.name}')`;
  executeQuery(sqlExists).spread(user => {
    if (Object.values(user[0])[0]) {
      authUser(req, res);
    } else {
      res.status(404);
      res.json({
        status: 404,
        message: 'User not found',
      });
    }
  });
});

module.exports = route;