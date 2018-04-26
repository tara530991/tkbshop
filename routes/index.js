var express = require('express');
var router = express.Router();
var http = require('http');
var mysql = require('mysql');
var app = express(); 
var events = require('events');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer')
var upload = multer({ dest: './public/upload/' });

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "tkbshop",
}),slice = [].slice;  

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
  var loginStatus = false ;
  if (req.session.email){
    loginStatus = true;
  } 
  var user = req.session.username;
  res.render('index', {
    loginStatus: loginStatus,
    data: user,
  });
  console.log(req.session.username);
});
router.get('/login', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('login',{
    message:"",
  });
});
router.post('/login1', function (req, res) {
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
      // console.log(data.length);
      if (data.length > 0 && data[0].email && data[0].password){
        var email = data[0].email;
        var pass = data[0].password;
        var username = data[0].username;
        req.session.views = 1;
        if (email==sql.email && pass==sql.password){
            req.session.views = 2;
            req.session.email = email;
            req.session.username = username;          
            res.render('login', {
              message: "<span>成功登入<br>" + username +" 歡迎你</span>",
            });
        }      
        else{
          req.session.views = 1;
          res.render('login', {
            message: "<span>輸入錯誤</span>",
          });
        }
      }else{
        req.session.views = 1;
        res.render('login', {
          message: "<span>帳號不存在</span>",
        });      
      }
      console.log(req.session.views);
    });
  } else if (loginStatus == ture){
    req.session.views = 0;
  }
});
  
router.get('/account', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('account');
});
router.get('/cart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('cart');
});
router.get('/check', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('check');
});
router.get('/checkover', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('checkover');
});
router.get('/contact', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('contact');
});
router.get('/member', function (req, res) {
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
      data: data,
    });
  });  
});
router.get('/member-edit', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }else{
    res.render('memberedit',{
      loginStatus: loginStatus,      
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
router.post('/member-edit1', function (req, res) {
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
      message:"<sapn>成功更新資料</span>",
    })
  }); 
}); 

router.get('/news', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  con.query('SELECT * FROM news',function(err,rows){
    var data = rows;
    res.render('news',{
      data:data,
    });
  });
});

router.get('/order', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('order');
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
      message:'<sapn>尚未登入，請先進行<a href="/login">登入</a>。</sapn>',
    });
  } else if (loginStatus){
    res.render('newpassword',{
      loginStatus: loginStatus,
      message:''
    });
  }
});
router.post('/newpass1', function (req, res) {
  // var confirm;
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
      message: '<span>已成功變更密碼！</span>'
    });
    // res.redirect("/index");
  } else {
    res.render('newpassword', {
      message: '<sapn>新密碼與確認密碼不一致喔！<br/>麻煩你再重新輸入一次</span>'
    });
    res.redirect("/newpass");
  }
});
router.get('/product', function (req, res) {
  res.render('product');
});
router.get('/qa', function (req, res) {
  res.render('qa');
});

router.get('/register', function (req, res) {
  res.render('register',{
    message: "",
  });
});
router.post('/registera', function (req, res) {
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
              message: '<sapn>恭喜你已經註冊成功囉！</span>',
            });
          });
      }else{
          res.render('register',{
            message:'<sapn>請先詳閱使用條款，並同意，才可以註冊喔！</span>',
          });
      } 
    }else{
      res.render('register', {
        message: '<sapn>密碼與確認密碼不一致！</span>',
      });
    }
});

//管理端
router.get('/admin', function (req, res) {
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
router.get('/admin/category/list', function (req, res) {
  res.render('backend/category');
});
router.get('/admin/category/add', function (req, res) {
  res.render('backend/categoryadd');
});
router.get('/admin/member/list', function (req, res) {
  res.render('backend/member');
}); 
router.get('/admin/news-list', function (req, res) {
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
router.get('/admin/news-add', function (req, res) {
  res.render('backend/newsadd',{
    message: '',
  });
}); 
router.post('/admin/news-add1', urlencodedParser, function (req, res) {
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
router.get('/admin/order/list', function (req, res) {
  res.render('backend/order');
});
router.get('/admin/product-list', function (req, res) {
  con.query('SELECT * FROM product',function(err,rows){
    var data = rows;
    if(err){
      console.log(err);
    }
    console.log(data[0].uptime);
    // data.uptime = con.query("DATE_FORMAT(" + data.uptime + ", '%Y %m %d')",function(err,rows){

    // });
    res.render('backend/product',{
      data: data,
    });
  });
});
router.get('/admin/product-add', function (req, res) {
  res.render('backend/productadd',{
    message: "",
  });
});
router.post('/admin/product-add1',upload.single('pic'), function (req, res) {
  var sql = {
    product: req.body.product,
    price: req.body.price,
    amount: req.body.amount,
    uptime: req.body.uptime,
    downtime: req.body.downtime,
    description: req.body.description,
    pic: req.body.pic,
    addtime: req.body.addtime,
    changetime: req.body.changetime,
    ident: req.body.ident,
    sort: req.body.sort,
    category: req.body.category,
  };
  console.log(req);
  var file = req.pic;
  console.log(file); 
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  var querySQL = "INSERT INTO product(product,price,amount,uptime,downtime,description,addtime,changetime,ident,sort,category) VALUE(?,?,?,?,?,?,?,?,?,?,?)";
  con.query(querySQL, [sql.product, sql.price, sql.amount, sql.uptime, sql.downtime, sql.description, sql.addtime, sql.changetime, sql.ident,sql.sort,sql.category],function(err,rows){
    if(err){
      console.log(err);
    }
    var data = rows;
    console.log(data);
    res.render('backend/productadd', {
      message: '<span>產品新增成功</span>',
    });
  });
});

router.get('/admin/suggest/list', function (req, res) {
  res.render('backend/suggest');
});
// router.get('我是在網址上出現的route名稱', function (req, res) {
//   res.render('我是view目錄下面的路徑位址');
// });

// con.end();
module.exports = router;

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