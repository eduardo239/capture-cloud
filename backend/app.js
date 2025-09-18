const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pool = require('./db');
const expressListEndpoints = require('express-list-endpoints');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log(apiKey);
  if (apiKey && apiKey === 'sua-chave-secreta-aqui') {
    next();
  } else {
    res.status(401).json({ error: 'Acesso não autorizado.' });
  }
});

app.use(
  cors({
    origin: 'http://localhost:5173', // URL do frontend no desenvolvimento
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

app.get('/db', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows[0]);
});

//

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//  mq = await connectQueue();

const endpoints = expressListEndpoints(app);
console.log(endpoints);

module.exports = app;
