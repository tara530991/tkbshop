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
var loginStatus;

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

router.get('/', function (req, res) { 
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1; 
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views); 
  res.render('index', { 
    loginStatus: loginStatus,
    username: req.session.username,
  });
});
router.get('/news', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views); 
  con.query('SELECT * FROM news WHERE Cstatus=1 LIMIT 10',function(err,rows){
    var data = rows;     
      res.render('news',{
      loginStatus: loginStatus,           
      views: req.session.views,
      data:data,
      moment: moment,
      username:req.session.username,
      });
    })
});
router.get('/ajaxNews', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  } else {
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views); 
  var sql = {
    sort: req.query.sort,
    search: req.query.search,    
  }
  console.log("排序方式：" + sql.sort);
  console.log("搜尋詞：" + sql.search);
  var sqlQuery = "SELECT * FROM news WHER Cstatus=1 AND concat(title,content) LIKE '%" + 
    sql.search + "%' ORDER BY date ";
  if (sql.sort == 1){sqlQuery += 'DESC;';
  }else if(sql.sort == 2){sqlQuery += 'ASC;';}
  con.query(sqlQuery, sql.search, function(err,rows){
    var data = rows; 
    // console.log(data);
    res.render('ajax_news', {
      loginStatus: loginStatus,
      username: req.session.username,
      views: req.session.views,
      data: data,
      moment: moment,
      message: "",
    });
  })
})

router.get('/newsContent', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  } else {
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);
  var sql = {
    newsId: req.query.newsId,
  }
  var count = 0;
  var sqlQuery = 'SELECT COUNT(id) AS len FROM news WHER Cstatus=1;';
  con.query(sqlQuery, function (err, rows) { 
    count = rows;
    console.log(count);    
  });
  var sqlQuery2 = 'SELECT * FROM news WHERE id=?;';  
  con.query(sqlQuery2, sql.newsId, function (err, rows) {
    var data = rows;
    res.render('newscontent', {
      loginStatus: loginStatus,
      views: req.session.views,
      data: data,
      count: count,
      moment: moment,
      username: req.session.username,
    });
  });
});

router.get('/contact', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  } else {
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);
  res.render('contact', {
    loginStatus: loginStatus,
    username: req.session.username,
    views: req.session.views,
    message: "",
  });
});

router.get('/storeinfo', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  } else {
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);
  res.render('storeinfo', {
    loginStatus: loginStatus,
    username: req.session.username,
    views: req.session.views,
    message: "",
  });
});

router.get('/suggestion', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views); 
  res.render('suggestion', {
    loginStatus: loginStatus,
    username: req.session.username,    
    views: req.session.views,
    message: "",
  });
});
router.post('/contact1', function (req, res) {
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
      username: req.session.username,                                         
      message: "十分感謝您的回復，我們會盡快答覆您的問題"
    });
  })
});
router.get('/qa', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views); 
  res.render('qa',{
    loginStatus: loginStatus,
    username: req.session.username,        
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