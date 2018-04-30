var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });

//管理端
router.get('/', function (req, res) {
  res.render('backend/index',{
    message: "",
  });
});
router.post('/admin1', function (req, res) {
  var sql = {
    account: req.body.account,
    password: req.body.password,
  };
  console.log(sql);
  var account = sql.account;
  var pass = sql.password;
  var admin = "admin";
  req.session.admin = 1;
  if(account == admin){
    if (pass == admin){
      req.session.admin++;
      res.render('backend/index', {
        message: '<span>歡迎你，管理者</span>',
      });     
    }else{
      req.session.admin = 1;
      res.render('backend/index', {
        message: '<span>密碼錯誤</span>',
      });     
    }
  }else{
    req.session.admin = 1;
    res.render('backend/index',{
      message: '<span>若非管理者，請離開</span>',
    });
  }
});
router.get('/news-list', function (req, res) {
  con.query('SELECT * FROM news',function(err,rows){
    var data = rows;
    if(err){
      console.log(err);
    }
    res.render('backend/news',{
      data:data,
    });
  });
}); 
router.get('/news-add', function (req, res) {
  res.render('backend/newsadd',{
    message: '',
  });
}); 
router.post('/news-add1', urlencodedParser, function (req, res) {
  var sql = {
    title: req.body.title,
    date: req.body.date,
    content: req .body.content,
  };
  console.log(sql);
  var querySQL = 'INSERT INTO news(title,date,content) VALUE(?,?,?)';
  con.query(querySQL,[sql.title, sql.date, sql.content],function(err,rows){
    var data = rows;
    if(err){
      console.log(err);
    }
    res.render('backend/newsadd',{
      message: '<sapn>消息已成功發佈</span>',
    });
  });
}); 
router.get('/suggest/list', function (req, res) {
  res.render('backend/suggest');
});

module.exports = router;