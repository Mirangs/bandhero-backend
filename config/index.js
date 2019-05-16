const config = {
  db: {
    mysql: {
      host: 'eu-cdbr-west-02.cleardb.net',
      user: 'b01cf08633f8b2',
      password: '5327b23e',
      database: 'heroku_9e77f3396586486',
    }
  },
  port: process.env.PORT,
}

module.exports = config;