var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });

//前端

//===============登入登出===============
router.get('/login', function (req, res) {
    var loginStatus = false;
    req.session.views = 1;  
    if (req.session.email) {
      loginStatus = true;
    }
    res.render('login',{
      loginStatus: loginStatus,     
      views: req.session.views,                     
      message:"",
    });
  });

router.post('/login1', function (req, res) {
  req.session.views = 1;
  var loginStatus = false;
  if (req.session.email) {    
    loginStatus = true;
  }
  var sql = {
    email:req.body.email,
    password:req.body.password,
  };
  if (loginStatus == false){
    con.query("SELECT * FROM member WHERE email='" + sql.email + "'",sql,function(err,rows){
      var data = rows;
      console.log(data);
      console.log("length: " + data.length);
      if (data.length > 0 && data[0].email && data[0].password){
        var email = data[0].email;
        var pass = data[0].password;
        var username = data[0].username;
        if (email==sql.email && pass==sql.password){
            req.session.views = 2;
            loginStatus = true;
          console.log("fdfd" + data.length);            
            req.session.email = email;          
            req.session.username = username;          
            res.render('login', {
              loginStatus: true,
              data: data,
              views: req.session.views,
              message: "<div><span>成功登入<br>" + username +" 歡迎你</span></div>",
            });
          console.log(loginStatus);
            
        } else if (data.length > 0){
          req.session.views = 1;
          res.render('login', {
            loginStatus: false,  
            views: req.session.views,                      
            message: "<span>輸入資料錯誤</span>",
          });
        }
      } else if (data.length == 0){
        req.session.views = 1;
        res.render('login', {
          loginStatus: false,           
          views: req.session.views,                     
          message: "<span>帳號不存在</span>",
        });      
      }
    });
  } else if (loginStatus == true){
    res.render('login', {
      loginStatus: true,
      views: req.session.views,      
      message: "<span>已經是登入狀態囉</span>",
    }); 
  }
  console.log("views: " + req.session.views);
  console.log(loginStatus);
});

router.get('/logout', function (req, res) {
  loginStatus = false;
  // 產生新的session
  req.session.regenerate(function (err) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    req.session.views = 0;  
    res.render('index');
  });
});

//===============會員中心===============
router.get('/', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  console.log(loginStatus);
  console.log("name " + req.session.username); 
  con.query("SELECT * FROM member WHERE username='" + req.session.username + "'", function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    console.log(data);
    res.render('member', {
      loginStatus: loginStatus,
      views: req.session.views,                             
      data: data,
    });
  });  
});
router.get('/edit', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }else{
    res.render('memberedit',{
      loginStatus: loginStatus,
      views: req.session.views,                             
      message:"",     
    });
  }
  con.query("SELECT * FROM member WHERE username='" + req.session.username + "'", function (err, rows) {
    var data = rows;
    res.render('memberedit',{
      loginStatus: loginStatus,
      username: '<input type="text" value="' + data[0].username + '" name="username">',    
      email: '<input type="text" value="' + data[0].email + '" name="email">',    
      tel: '<input type="text" value="' + data[0].tel + '" name="tel">',    
      birth: '<input type="text" value="' + data[0].birth + '" name="birth">',    
      address: '<input type="text" value="' + data[0].address + '" name="address">',    
    });
  });
});
router.post('/edit1', function (req, res) {
  var sql = {
    username: req.body.username,
    email: req.body.email,
    tel: req.body.tel,
    birth: req.body.birth,    
    address: req.body.address,    
  }
  var querySQL = "UPDATA member SET username=(?),email=(?),tel=(?),birth=(?),address=(?) WHERE username='" + req.session.username + "'";
  con.query(querySQL,[sql.username, sql.email, sql.tel, sql.birth, sql.address], function (err, rows) {
    if(err){
      console.log(err);
    }
    res.render('memberedit',{
      loginStatus: loginStatus,           
      views: req.session.views,                             
      message:"<sapn>成功更新資料</span>",
    })
  }); 
}); 
router.get('/newpass', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  console.log(loginStatus);
  if (!loginStatus) {
    res.render('newpassword', {
      loginStatus: loginStatus,
      views: req.session.views,                             
      message:'<sapn>尚未登入，請先進行<a href="/login">登入</a></sapn>',
    });
  } else if (loginStatus){
    res.render('newpassword',{
      loginStatus: loginStatus,
      views: req.session.views,                             
      message:'',
    });
  }
});
router.post('/newpass1', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  } 
  var sql = {
    oldpass: req.body.oldpass,
    newpass: req.body.newpass,
    newpass2: req.body.newpass2,
  };
  var oldP = sql.oldpass;
  var newP = sql.newpass;
  var newP2 = sql.newpass2;
  if (newP == newP2) {
    con.query("UPDATE member SET password='" + newP + "' WHERE password='" + oldP + "'", sql, function (err, rows) {
      if (err) {
        console.log(err);
      }
    });
    res.render('newpassword', {
      loginStatus: loginStatus,
      views: req.session.views,                             
      message: '<span>已成功變更密碼！</span>'
    });
  } else {
    res.render('newpassword', {
      loginStatus: loginStatus,
      views: req.session.views,                             
      message: '<sapn>新密碼與確認密碼不一致喔！<br/>麻煩你再重新輸入一次</span>'
    });
  };
});

router.get('/register', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  } 
  res.render('register',{
    loginStatus: loginStatus,        
    views: req.session.views,                             
    message: "",
  });
});

router.post('/register1', function (req, res) {
  var sql = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,        
    tel: req.body.tel,
    cell: req.body.cell,
    birth: req.body.birth,
    address: req.body.address,
    allow: req.body.allow,
    };
  var allow = sql.allow;
  var pass = sql.password;
  var pass2 = sql.password2;
  console.log(sql);
  if(pass == pass2){
    console.log(pass);
    if(allow == 1){
      console.log(allow);        
        con.query('INSERT INTO member SET ?', sql, function (err, rows) {
            if (err) {
                console.log(err);
            }
            // res.setHeader('Content-Type', 'application/json');
          res.render('register', {
            loginStatus: loginStatus,        
            views: req.session.views,                             
            message: '<sapn>恭喜你已經註冊成功囉！</span>',
          });
        });
    }else if(allow == 0){
        res.render('register',{
          loginStatus: loginStatus,
          views: req.session.views,
          message:'<sapn>請先詳閱使用條款，並同意，才可以註冊喔！</span>',
        });
    } 
  }else{
    res.render('register', {
      loginStatus: loginStatus,
      views: req.session.views,
      message: '<sapn>密碼與確認密碼不一致！</span>',
    });
  }
});

module.exports = router;
