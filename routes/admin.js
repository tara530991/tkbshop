var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var moment = require('moment');

// 圖片上傳
var multer = require('multer');
// var upload = multer({ dest: 'public/upload/' });
var path = require('path');
const storage = multer.diskStorage({
  destination: path.join('public/upload/'),
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "") +
      '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage }).single('pic');

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
router.post('/news-add1', upload, function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  var sql = {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
  };
  console.log(sql);
  var file = req.file;
  // console.log(file);
  console.log('文件類型：' + file.mimetype);
  console.log('文件副檔名：' + path.extname(file.originalname));
  console.log('原始文件名：' + file.originalname);
  console.log('DB儲存文件名稱：' + file.filename);
  console.log('文件保存路径：' + file.path);
  upload(req, res, err => {
    var slqQuery = "INSERT INTO news(title,date,pic,content) VALUE(?,?,?,?)";
    con.query(slqQuery, [sql.title, sql.date, file.filename, sql.content] , function (err, rows) {
      if (err) { console.log(err); }
      var data = rows;
      res.render('backend/toNews', {
        loginStatus: loginStatus,
        message: '消息已成功發佈',
      });
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