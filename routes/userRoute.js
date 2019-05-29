const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const authUser = async (req, res) => {
  const { body: { name, pass } } = req;
  const sql = `SELECT * from user WHERE login = '${name}'`;

  executeQuery(sql).spread(async user => {
    const compare = await bcrypt.compareSync(pass, user[0].pass, err => console.log(err));
    if (compare) {
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