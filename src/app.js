'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');

const tourRouter = require('./routes/tour.route');
const userRouter = require('./routes/user.route');

const app = express();

//init middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(express.static(`${__dirname}/../public`)); // serve static files

// init db
require('./dbs/init.mongodb');
// const {checkOverload} = require('./helpers/check.connect');
// checkOverload();

// init routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// handling errors

module.exports = app;