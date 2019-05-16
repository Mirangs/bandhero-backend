const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');

route.post('/', (req, res) => {
  const sql = `UPDATE user_add SET avatar='${req.body.avatar}', about='${req.body.about}', pref_music=${req.body.pref_music}, instrument=${req.body.instrument}, country=${req.body.country} WHERE user_id=${req.body.id}`;
  executeQuery(sql)
  .spread(() => {
    res.status(200);
    res.end('OK');
  })
  .catch(err => {
    res.status(500);
    res.end('something wend wrong');
    console.log(err);
  });
});

module.exports = route;