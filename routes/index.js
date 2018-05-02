var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });
var moment = require('moment');

// 在每一個請求被處理之前都會執行的middleware
router.use(function (req, res, next) {
  // 輸出記錄訊息至終端機
  console.log(req.method, req.url);
  // 繼續路由處理
  next();
});

/* GET page router. */
//前端
// router.get('/app', function (req, res) {
//   res.render('app');
// });


module.exports = function (app) {
  require('./product')(app);

};
router.get('/', function (req, res) { 
  var loginStatus = false ;
  if (req.session.email){
    loginStatus = true;
  } 
  res.render('index', { 
    loginStatus: loginStatus,
    views: req.session.views,
    data: req.session.username,
  });
  console.log(req.session.username);
  console.log(req.session.views);
});
router.get('/news', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  con.query('SELECT * FROM news LIMIT 10',function(err,rows){
    var data = rows;     
      res.render('news',{
      loginStatus: loginStatus,           
      views: req.session.views,
      data:data,
      moment: moment,
      });
    })
});
router.get('/contact', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('contact', {
    loginStatus: loginStatus,
    views: req.session.views,
    message: "",
  });
});
router.post('/contact1', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  var sql = {
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel,
    cell: req.body.cell,
    address: req.body.address,
    content: req.body.content,
  };
  var querySQL = 'INSERT INTO suggest(name,email,tel,cell,address,content,uptime) VALUES(?,?,?,?,?,?,NOW())';
  con.query(querySQL, [sql.name, sql.tel, sql.cell, sql.address, sql.email, sql.content], function (err, rows) {
    if (err) { console.log(err); }
    res.render('contact', {
      loginStatus: loginStatus,    
      views: req.session.views,                                   
      message: "十分感謝您的回復"
    });
  })
});
router.get('/qa', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('qa',{
    loginStatus: loginStatus,    
    views: req.session.views,
  });
});

module.exports = router;

// router.get('我是在網址上出現的route名稱', function (req, res) {
//   res.render('我是view目錄下面的路徑位址');
// });

// con.end();

//session
// （放在app）Use the session middleware
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))
// （放在index）
// app.get('/', function (req, res, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })

//圖片上傳
// router.post('/upload', upload.single('pic'), function (req, res, next) {
//   var file = req.file;
//   console.log('文件类型：%s', file.mimetype);
//   console.log('原始文件名：%s', file.originalname);
//   console.log('文件大小：%s', file.size);
//   console.log('文件保存路径：%s', file.path);
//   res.send({ ret_code: '0' });
// });