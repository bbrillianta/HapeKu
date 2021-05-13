const express = require('express');
require('dotenv').config();

const app = express();

require('./startups/express')(app);
require('./startups/cors')(app);
require('./startups/mongoose')();

module.exports = app;

