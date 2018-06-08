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

function statusTransform(statusNum) {
  // console.log("狀態" + statusNum);
  switch (statusNum) {
    case 1: status = '上架中'; break;      
    case 2: status = '下架中'; break;
  }
  // console.log("狀態" + status);
  return status;
}

function statusTransform2(statusNum) {
  // console.log("狀態" + statusNum);
  switch (statusNum) {
    case 0: status = '未回覆'; break;
    case 1: status = '處理中'; break;
    case 2: status = '完成'; break;
  }
  // console.log("狀態" + status);
  return status;
}

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

//---------------------消息-----------------------
router.get('/news-list', function (req, res) {
  var loginStatus = false;
  req.session.admin = 1;  
  if (req.session.admin > 1) {
    loginStatus = true;
  }
  var sqlQuery = 'SELECT * FROM news WHERE Cstatus="1" OR Cstatus="2";';
  con.query(sqlQuery,function(err,rows){
    var data = rows;
    // console.log(data);
    if(err){console.log(err);}
    var statusArray = new Array();
    for (var i = 0; i < data.length; i++) {
      statusArray.push(statusTransform(data[i].Cstatus));
    }
    res.render('backend/newslist',{
      loginStatus: loginStatus,      
      data:data,
      statusArray: statusArray,
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
    status: req.body.status,
  };
  // console.log(sql);
  var file = req.file;
  // console.log(file);
  console.log('文件類型：' + file.mimetype);
  console.log('文件副檔名：' + path.extname(file.originalname));
  console.log('原始文件名：' + file.originalname);
  console.log('DB儲存文件名稱：' + file.filename);
  console.log('文件保存路径：' + file.path);
  upload(req, res, err => {
    var slqQuery = "INSERT INTO news(title,date,pic,content,status) VALUE(?,?,?,?,?)";
    con.query(slqQuery, [sql.title, sql.date, file.filename, sql.content, sql.status] , function (err, rows) {
      if (err) { console.log(err); }
      var data = rows;
      res.render('backend/toNewsAdd', {
        loginStatus: loginStatus,
        message: '消息已成功發佈',
      });
    });
  });
}); 

router.get('/newsContent', upload, function (req, res) {
  var loginStatus = false;
  req.session.admin = 1;
  if (req.session.admin > 1) {
    loginStatus = true;
  }
  var sql = {
    newsId:req.query.newsId,
  };
  var count = 0;
  var sqlQuery = 'SELECT COUNT(id) AS len FROM news;';
  con.query(sqlQuery, function (err, rows) {
    count = rows;
    console.log(count);
  });
  var sqlQuery2 = 'SELECT * FROM news WHERE id=?;';
  con.query(sqlQuery2, sql.newsId, function (err, rows) {
    var data = rows;
    res.render('backend/newscontent', {
      loginStatus: loginStatus,
      views: req.session.views,
      data: data,
      count: count,
      moment: moment,
      username: req.session.username,
    });
  });
}); 

router.get('/newsModify', function (req, res) {
  var loginStatus = false;
  req.session.admin = 1;
  if (req.session.admin > 1) {
    loginStatus = true;
  }
  var sql = {
    newsId: req.query.newsId,
  };
  var sqlQuery = 'SELECT * FROM news WHERE id=?;';
  con.query(sqlQuery, sql.newsId, function (err, rows) {
    var data = rows;
    res.render('backend/newsmodify', {
      loginStatus: loginStatus,
      data:data,
      message: '',
      moment:moment,
    });
  });
}); 

router.post('/newsModify1', upload, function (req, res) {
  var loginStatus = false;
  req.session.admin = 1;
  if (req.session.admin > 1) {
    loginStatus = true;
  }
  var sql = {
    newsId: req.body.newsId,
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    status: req.body.status,
  };
  console.log(sql);
  var file = req.file;
  if(file == null){
    console.log(1);
    var sqlQuery = 'UPDATE news SET title=?,date=?,content=?,status=? WHERE id=?;';
    con.query(sqlQuery, [sql.title, sql.date, sql.content, sql.status, sql.newsId], function (err, rows) {
      var data = rows;
      console.log(data);
      if (err) { console.log(err); }
      res.render('backend/toNewsList', {
        loginStatus: loginStatus,
        message: '消息修改成功',
      });
    });
  }else{
    console.log(2);
    console.log('文件類型：' + file.mimetype);
    console.log('文件副檔名：' + path.extname(file.originalname));
    console.log('原始文件名：' + file.originalname);
    console.log('DB儲存文件名稱：' + file.filename);
    console.log('文件保存路径：' + file.path);
    upload(req, res, err => {
      var slqQuery = 'UPDATE news SET title=?,date=?,content=?,pic=?,status=? WHERE id=?;';
      con.query(slqQuery, [sql.title, sql.date, sql.content, file.filename, sql.status, sql.newsId], function (err, rows) {
        var data = rows;
        console.log(data);
        if (err) { console.log(err); }
        res.render('backend/toNewsList', {
          loginStatus: loginStatus,
          message: '消息修改成功',
        });
      });
    });
  }
}); 

router.post('/ajaxDeleteNews', upload, function (req, res) {
  var loginStatus = false;
  req.session.admin = 1;
  if (req.session.admin > 1) {
    loginStatus = true;
  }
  var sql = {
    newsId: req.body.newsId,
  };
  console.log(sql);
  var slqQuery = 'UPDATE news SET status="0" WHERE id=?;';
  con.query(slqQuery, sql.newsId, function (err, rows) {
    var data = rows;
    // console.log(data);
    if (err) { console.log(err); }
    var sqlQuery = 'SELECT * FROM news WHERE status="1" OR status="2";';
    con.query(sqlQuery, function (err, rows) {
      var data = rows;
      // console.log(data);
      if (err) { console.log(err); }
      var statusArray = new Array();
      for (var i = 0; i < data.length; i++) {
        statusArray.push(statusTransform(data[i].status));
      }
      res.render('backend/ajax_news', {
        loginStatus: loginStatus,
        data: data,
        statusArray: statusArray,
        moment: moment,
      });
    });
  });
})

//--------------------顧客意見----------------------
router.get('/suggest-list', function (req, res) {
  var loginStatus = false;
    req.session.admin = 1;  
    if (req.session.admin > 1) {
      loginStatus = true;
    }
  var sqlQuery = 'SELECT * FROM suggest'
  con.query(sqlQuery,function(err,rows){
    var data = rows;
    if (err) {console.log(err);}
    var statusArray = new Array();
    for (var i = 0; i < data.length; i++) {
      statusArray.push(statusTransform2(data[i].status));
    }
    var sqlQuery2 = 'SELECT * FROM suggest_reply'
    con.query(sqlQuery2, function (err, rows) {
      var data2 = rows;
      if (err) { console.log(err); }
      res.render('backend/suggest',{
        loginStatus: loginStatus,      
        moment: moment,
        data: data,
        data2:data2,
        statusArray: statusArray,
        message: '',    
      });
    });
  });
});

module.exports = router;