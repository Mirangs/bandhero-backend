const express = require('express');
const db = require('mysql-promise')();
const config = require('./config/index');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/usersRoute');
const userRoute = require('./routes/userRoute');
const newsRoute = require('./routes/newsRoute');

const app = express();

const { port } = config;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', usersRoute);
app.use('/api/user', userRoute);
app.use('/api/news', newsRoute);

db.configure(config.db.mysql);
app.listen(port, () => console.log(`Listening on port: ${port}`));