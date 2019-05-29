const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');

route.post('/', async (req, res) => {
  const { body, body: { login, email, phone, pass } } = req;

  // Validation
  const { error } = registerValidation(body);
  if (error) return res.status(400).send(error.details[0].message);

  const sqlExists = `SELECT EXISTS(SELECT id FROM user_main WHERE email = '${email}' OR login = '${login}' OR phone = '${phone}')`;

  executeQuery(sqlExists).spread(result => {
    if (Object.values(result[0])[0]) {
      res.status(403);
      res.json({
        status: 403,
        message: 'User already exists'
      });
    }
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(pass, salt);

  const sql = `INSERT INTO user_main (login, pass, email, isPremium, phone) VALUES ('${login}', '${hashedPass}', '${email}', 0, '${phone}')`;

  executeQuery(sql).spread(user => {
    const sql = `SELECT id FROM user_main WHERE email = '${email}'`;
    executeQuery(sql).spread(user => {
      const sql = `INSERT INTO user_add (user_id) VALUES(${user[0].id})`;
      executeQuery(sql).spread(() => {
        res.status(200);
        res.json({
          status: 200,
          message: 'OK'
        });
      });
    })
    .catch(err => console.log(err));
  });
});

module.exports = route;