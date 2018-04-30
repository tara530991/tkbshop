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
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var multer = require('multer');
var upload = multer({ dest: 'upload/' });
// var expressLayouts = require('express-ejs-layouts');

//前台路由
var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');
var productRouter = require('./routes/product');
//後台路由
var adminRouter = require('./routes/admin');
var adminproductRouter = require('./routes/adminproduct');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'ejs' );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressLayouts);

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 10000 } }));
//maxAge：多久後session與相對應的cookie會失效，單位為毫秒（1秒=100毫秒）

//單引號內為url上的路徑名稱，可自定義
app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/adminP', adminproductRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());
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
