const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// loads environment variables from a .env file into process.env
dotenv.config();

const apiRoutes = require('./routes');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, '../clients'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../clients')));


// api routes
app.use('/api/v0/', apiRoutes);

// Root URI call
app.get('/', async (req, res) => {
  res.send('/api/v0/');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

/**
 * The global error handler is used catch all errors and remove the need
 * for redundant error handler code throughout the application.
 */
app.use((err, req, res) => {
  switch (err.name) {
    // custom application error
    // mongoose validation error
    case 'Error':
    case 'ValidationError':
      return res.status(400).json({ message: err.message });
    // jwt authentication error
    case 'UnauthorizedError':
      return res.status(401).json({ message: 'Invalid Token' });
    default:
      // default to 500 server error
      return res.status(500).json({ message: err.message });
  }
});

module.exports = app;
