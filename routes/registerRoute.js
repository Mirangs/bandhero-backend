const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');

route.post('/', (req, res) => {
  const sqlExists = `SELECT EXISTS(SELECT id FROM user_main WHERE email = '${req.body.email}' OR login = '${req.body.login}' OR phone = '${req.body.phone}')`;

  executeQuery(sqlExists).spread(result => {
    if (Object.values(result[0])[0]) {
      res.status(400);
      res.json({
        status: 400,
        message: 'User already exists'
      });
    }
  });

  const pass = crypto.createHash('md5').update(req.body.pass).digest('hex');
  const sql = `INSERT INTO user_main (login, pass, email, isPremium, phone) VALUES ('${req.body.login}', '${pass}', '${req.body.email}', 0, '${req.body.phone}')`;

  executeQuery(sql).spread(user => {
    let id;
    const sql = `SELECT id FROM user_main WHERE email = '${req.body.email}'`;
    executeQuery(sql).spread(user => {
      const sql = `INSERT INTO user_add (user_id) VALUES(${user[0].id})`;
      executeQuery(sql).spread(user => {
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