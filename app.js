var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var ejs = require('ejs');
var jquery = require('jquery');
var qs = require('querystring');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'ejs' );

//session
// app.use(session({secret: 'an',resave: false,saveUninitialized: true}));
var session = require('express-session');
// var identityKey = 'skey';
var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
// app.use(session({
//   name: 'session',
//   keys: ['key1', 'key2'],
//   cookie: {
//     secure: true,
//     httpOnly: true,
//     domain: 'localhost',
//     path: '/',
//     expires: expiryDate
//   }
// }));

// app.use(session({
//   secret: 'sessiontest',//与cookieParser中的一致
//   resave: true,
//   saveUninitialized: true
// }));

// app.get("/test", function (req, res) {
//   req.render('test.html');
//   console.info(req.session.item);
//   req.session.item = 'Hello World';
//   return res.send('Hello SESSION');
// });

// app.use(session({
//   name: identityKey,
//   secret: 'chyingp',  // 用来对session id相关的cookie进行签名
//   store: new session,  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
//   saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
//   resave: false,  // 是否每次都重新保存会话，建议false
//   cookie: {
//     maxAge: 10 * 1000  // 有效期，单位是毫秒
//   }
// }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
