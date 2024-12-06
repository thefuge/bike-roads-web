const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/accountRouter');
const tokensRouter = require('./routes/tokensRouter');
const routeRouter = require('./routes/routeRouter');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/account/', accountRouter);
app.use('/api/tokens/', tokensRouter);
app.use('/api/routes/', routeRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
