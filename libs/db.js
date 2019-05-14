const db = require('mysql-promise')();

const executeQuery = (sql) => {
  return db.query(sql, console.log('sql query done: '), sql);
}

module.exports = executeQuery;