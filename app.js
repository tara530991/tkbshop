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


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "admin",
//   password: "admin",
//   database: "tkbshop",
// });
/*
con.connect(function(err) {  //建立con連線物件，並利用connet進行連線
    // if (err) throw err;
    var result = "";
    //連接資料庫
    if (err) {
        console.log("Connecting error.");
        return;
    }
    console.log("Connecting success.");
});
*/
/*
    //查詢資料
    con.query('SELECT * FROM accountlist',function(err,result){
        if (err) {
            console.log("Select error.");
            return;
        }
        console.log(result);
    });
    // 修改資料
    con.query('UPDATE accountlist SET password = ? where account = "tara530991"','cb5449',function(err,result){
        if(err){
            console.log("Update error.");
            return;
        }
        console.log(result);        
    });
    // var sql = 'INSERT INTO account(account,password) VALUE ?';
    // var value = [account.body.account,account.body.password];
    // con.sql(sql,value,function(err,result){
      //     if(err) throw err;
      //     console.log("Number of records inserted:" + result.affectedRows);
      // })
      */
// con.end();

// //index 登入
// var isLogin = false;
// var checkLoginStatus = function (req, res) {
//   isLogin = false;
//   if (req.signedCookies.userid && req.signedCookies.password) {
//     isLogin = true;
//   }
// };
// exports.index = function (req, res) {
//   checkLoginStatus(req, res);
//   res.render('index', { loginStatus: isLogin });
// };

// //signIn
// router.get('/signin', function (req, res) {
//   console.log(req.body['account']);
//   console.log(req.body['password']);
//   res.render('signin');


// });


module.exports = app;
