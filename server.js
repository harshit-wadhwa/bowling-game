const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');
const errorMiddleware = require('./middlewares/error.middleware');

const server = express();
require('./mongoose');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.use('/', routes);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(errorMiddleware);

server.listen(process.env.PORT || 8000);

module.exports = server;
