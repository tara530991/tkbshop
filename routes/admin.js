var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });
var moment = require('moment');

//管理端
router.get('/', function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  res.render('backend/login',{
    loginStatus: loginStatus,
    message: "",
  });
});

router.get('/index', function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  res.render('backend/index',{
    loginStatus: loginStatus,
    message: "",
  });
});

router.post('/login', function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  var sql = {
    account: req.body.account,
    password: req.body.password,
  };
  console.log(sql); 
  if(sql.account == "admin"){
    if (sql.password == "admin"){
      req.session.admin = 2;   
      res.render('backend/index', {
        loginStatus:loginStatus,
        message: '<span class="alert alert-success">歡迎你，管理者</span>',
      });     
    }else if(sql.password !== "admin"){
      req.session.admin = 1;
      res.render('backend/index', {
        loginStatus:loginStatus,        
        message: '<span class="alert alert-warning">密碼錯誤</span>',
      });     
    }
  }else if (sql.account !== "admin"){
    req.session.admin = 1;
    res.render('backend/index',{
      loginStatus:loginStatus,      
      message: '<span class="alert alert-danger">若非管理者，請離開</span>',
    });
  }
});
router.get('/logout', function (req, res) {
  loginStatus = false;
  // 產生新的session
  req.session.regenerate(function (err) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    req.session.admin = 0;  
    res.render('backend/index',{
      loginStatus: loginStatus,      
    });
  });
});

router.get('/tofront', function (req, res) {
  loginStatus = false;
  // 產生新的session
  req.session.regenerate(function (err) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    req.session.admin = 0;
    res.render('../index');
  });
});

router.get('/member', function (req, res) {
  var loginStatus = false;
  req.session.admin = 1;
  if (req.session.admin > 1) {
    loginStatus = true;
  }
  con.query('SELECT * FROM member', function (err, rows) {
    var data = rows;
    if (err) {
      console.log(err);
    }
    res.render('backend/member', {
      loginStatus: loginStatus,            
      data: data,
      moment: moment,
    });
  });
}); 

router.get('/news-list', function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  con.query('SELECT * FROM news',function(err,rows){
    var data = rows;
    if(err){
      console.log(err);
    }
    res.render('backend/news',{
      loginStatus: loginStatus,      
      data:data,
      moment: moment,
    });
  });
}); 
router.get('/news-add', function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  res.render('backend/newsadd',{
    loginStatus: loginStatus,      
    message: '',
  });
}); 
router.post('/news-add1', urlencodedParser, function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
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
      loginStatus: loginStatus,      
      message: '<sapn class="alert alert-success">消息已成功發佈</span>',
    });
  });
}); 
router.get('/suggest-list', function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  con.query('SELECT * FROM suggest',function(err,rows){
    var data = rows;
    if (err) {
      console.log(err);
    }
    res.render('backend/suggest',{
      loginStatus: loginStatus,      
      moment: moment,
      data:data,
      message: '',    
    });
  });
});

module.exports = router;