const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/accountRouter');
const tokensRouter = require('./routes/tokensRouter');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/account/', accountRouter);
app.use('/api/tokens/', tokensRouter);

module.exports = app;
