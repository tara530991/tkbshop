var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });
var moment = require('moment');
var loginStatus = false;

//前端

//===============登入登出===============
router.get('/login', function (req, res) {
  req.session.views = 1;  
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('login',{
    loginStatus: loginStatus,     
    username: req.session.username,     
    views: req.session.views,                                     
    message:"",
  });
});

router.post('/login1', function (req, res) {
  req.session.views = 1;
  if (req.session.email) {    
    loginStatus = true;
  }
  var sql = {
    email:req.body.email,
    password:req.body.password,
  };
  // if (loginStatus == true && req.session.views == 2){
  //   res.render('login', {
  //     loginStatus: true,
  //     data: data,
  //     views: req.session.views,});
  // }else 
  if (loginStatus == false){
    con.query("SELECT * FROM member WHERE email='" + sql.email + "'",sql,function(err,rows){
      var data = rows;
      console.log(data);
      console.log("登入資訊筆數: " + data.length);
      if (data.length > 0 && data[0].email && data[0].password){
        var email = data[0].email;
        var pass = data[0].password;
        var username = data[0].username;
        var password = data[0].password;
        if (email==sql.email && pass==sql.password){
            req.session.views = 2;
            loginStatus = true;
            req.session.email = email;          
            req.session.username = username;
            req.session.password = password;
            // return req.session.username;          
            // return req.session.email;          
            console.log("登入資訊：" + req.session.views);            
            console.log("登入帳戶：" + email);            
            res.render('toList', {
              loginStatus: true,
              username: req.session.username,              
              views: req.session.views,              
              data: data,
              message: username +" 歡迎你",
            });
          console.log("登入狀態：" + loginStatus);
        } else if (data.length > 0){
          req.session.views = 1;
          console.log("登入失敗");
          res.render('login', {
            loginStatus: false,                      
            views: req.session.views,              
            message: "輸入資料錯誤",
          });
        }
      } else if (data.length == 0){
        req.session.views = 1;
        console.log("登入失敗");
        res.render('login', {
          loginStatus: false,                               
          views: req.session.views,              
          message: "帳號不存在",
        });      
      }
    });
  } else if (loginStatus == true){
    console.log("已經為登入狀態");
    con.query("SELECT * FROM member WHERE email='" + sql.email + "'", sql, function (err, rows) {    
      var data = rows;      
      res.render('toList', {
      loginStatus: true,        
      username: req.session.username,                      
      views: req.session.views,      
      data:data,
      message: "<span>已經是登入狀態囉</span>",
      }); 
    }); 
  }
});

router.get('/logout', function (req, res) {
  // 產生新的session
  req.session.regenerate(function (err) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    req.session.views = 0;
    res.render('toList',{
      loginStatus : false,
      message: '已成功登出',      
    });
  });
});

//===============會員中心===============
router.get('/', function (req, res) {
  console.log("登入狀態："　+ loginStatus);
  console.log("登入帳戶：" + req.session.email);   
  console.log("登入者：" + req.session.username); 
  if (req.session.email) {
    loginStatus = true;
  } 
  con.query("SELECT * FROM member WHERE email='" + req.session.email + "'", function (err, rows) {
    var data = rows;
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render('member', {
      loginStatus: loginStatus,
      username: req.session.username,                                                  
      data: data,
      moment:moment,
      message:'',
    });
  });  
});
router.get('/edit', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
  }
  con.query("SELECT * FROM member WHERE email='" + req.session.email + "'", function (err, rows) {
    var data = rows;
    res.render('memberedit',{
      loginStatus: loginStatus,
      username: req.session.username,      
      data:data,
      message:'',
      moment:moment,
    });
  });
});
router.post('/edit1', function (req, res) {
  var sql = {
    username: req.body.username,
    tel: req.body.tel,
    birth: req.body.birth,    
    address: req.body.address,    
  }
  var querySQL = "UPDATE member SET username=(?),tel=(?),birth=(?),address=(?) WHERE email='" + req.session.email + "'";
  con.query(querySQL,[sql.username, sql.tel, sql.birth, sql.address], function (err, rows) {
    if(err){
      console.log(err);
    }
    res.render('toList',{
      loginStatus: loginStatus,           
      username: req.session.username,                                                        
      message:"成功更新資料",
    })
  }); 
}); 

router.get('/newpass', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
  }
  console.log(req.session.password);
  if (!loginStatus) {
    res.render('newpassword', {
      loginStatus: loginStatus,
      username: req.session.username,                                                                                    
      message:'<sapn>尚未登入，請先進行<a href="/login">登入</a></sapn>',
    });
  } else if (loginStatus){
    res.render('newpassword',{
      loginStatus: loginStatus,
      username: req.session.username,                                                        
      message:'',
    });
  }
});
router.post('/newpass1', function (req, res) {
  var sql = {
    oldpass: req.body.oldpass,
    newpass: req.body.newpass,
    newpass2: req.body.newpass2,
  };
  var oldP = sql.oldpass;
  var newP = sql.newpass;
  var newP2 = sql.newpass2;
  if (req.session.password == oldP){
    if (newP == newP2) {
      con.query("UPDATE member SET password='" + newP + "' WHERE password='" + oldP + "'", sql, function (err, rows) {
        if (err) {
          console.log(err);
        }
        res.render('toList', {
          loginStatus: loginStatus,
          username: req.session.username,                                                        
          message: '已成功變更密碼！'
        });
      });
    } else if (newP !== newP2) {
      res.render('newpassword', {
        loginStatus: loginStatus,
        username: req.session.username,                                                       
        message: '<sapn>新密碼與確認密碼不一致喔！<br/>麻煩你再重新輸入一次</span>',
      });
    }
  } else if (req.session.password !== oldP){
    res.render('newpassword', {
      loginStatus: loginStatus,
      username: req.session.username,
      message: '<sapn>舊密碼不正確！<br/>麻煩你再重新輸入一次</span>',
    });
  }
});

router.get('/register', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('register',{
    loginStatus: loginStatus,        
    username: req.session.username,                                                       
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
            username: req.session.username,                                          
            message: '<sapn>恭喜你已經註冊成功囉！</span>',
          });
        });
    }else if(allow == 0){
        res.render('register',{
          loginStatus: loginStatus,
          message:'<sapn>請先詳閱使用條款，並同意，才可以註冊喔！</span>',
        });
    } 
  }else{
    res.render('register', {
      loginStatus: loginStatus,  
      message: '<sapn>密碼與確認密碼不一致！</span>',
    });
  }
});

module.exports = router;
