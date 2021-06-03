const express = require('express');
require('dotenv').config();

const app = express();

require('./startups/express')(app);
require('./startups/cors')(app);
require('./startups/mongoose')();

require('./routes/auth')(app);
require('./routes/product')(app);
require('./routes/user')(app);

module.exports = app;

