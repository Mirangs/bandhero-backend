const express = require('express');
const db = require('mysql-promise')();
const config = require('./config/index');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importing routes
const usersRoute = require('./routes/usersRoute');
const userRoute = require('./routes/userRoute');
const newsRoute = require('./routes/newsRoute');
const musicListRoute = require('./routes/musicListRoute');
const countriesListRoute = require('./routes/countriesListRoute');
const instrumentsListRoute = require('./routes/instrumentsListRoute');
const changeUserDataRoute = require('./routes/changeUserDataRoute');
const registerRoute = require('./routes/registerRoute');

const app = express();

// Connect to DB
db.configure(config.db.mysql);

// Configure middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routes
app.use('/api/users', usersRoute);
app.use('/api/user', userRoute);
app.use('/api/news', newsRoute);
app.use('/api/music-list', musicListRoute);
app.use('/api/countries-list', countriesListRoute);
app.use('/api/instruments-list', instrumentsListRoute);
app.use('/api/change-user-data', changeUserDataRoute);
app.use('/api/register', registerRoute);

app.listen(port, () => console.log(`Listening on port: ${config.port}`));