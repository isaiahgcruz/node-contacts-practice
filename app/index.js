const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const contact = require('./contact');
const middlewares = require('./middleware');
const app = express();

app.use(bodyParser.json());

app.use('/api/contacts/', contact.routes);
app.use(middlewares.notFoundHandler);

module.exports = app;