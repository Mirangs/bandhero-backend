const express = require('express');
const route = express.Router();
const executeQuery = require('../libs/db');

route.get('/', (req, res) => {
  const sql = `SELECT * FROM music_style`;
  executeQuery(sql).spread(musicStyle => {
    res.setHeader('content-type', 'application/json');
    res.json(musicStyle);
  });
});

module.exports = route;