const dotenv = require('dotenv');

dotenv.config();

const config = {
  db: {
    mysql: {
      host: process.env.HEROKU_HOST,
      user: process.env.HEROKU_USER,
      password: process.env.HEROKU_PASSWORD,
      database: process.env.HEROKU_DATABASE,
    }
  },
  port: process.env.PORT || 8081,
}

module.exports = config;