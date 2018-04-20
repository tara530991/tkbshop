var express = require('express');
var router = express.Router();
var http = require('http');
var mysql = require('mysql');
var app = express();


var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "tkbshop",
}),slice = [].slice;  

var checkLoginStatus = function (req, res) {
  loginStatus = false;
  if (req.signedCookies.userid && req.signedCookies.password) {
    loginStatus = true;
  }
};

// 在每一個請求被處理之前都會執行的middleware
router.use(function (req, res, next) {
  // 輸出記錄訊息至終端機
  console.log(req.method, req.url);
  // 繼續路由處理
  next();
});

// var commonMethod = function (callback) {
//   con = mysql.createConnection(con.config);
//   con.connect();
//   callback.call(con, callback);
//   con.end();
// };

// var onerror = function () {
//   console.log(err);
// };

// var query = function () {
//   var args = arguments;
//   commonMethod(function () {
//     con.query.apply(con, args)
//       .on('error', onerror);
//   });
// };  

// con.connect(function (err) {
//   if (err) {
//     console.log('connecting error');
//     return;
//   }
//   console.log('connecting success');
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.type('html');
//   res.render('index');
// });

/* GET page router. */
//前端
// router.get('/app', function (req, res) {
//   res.render('app');
// });

router.get('/', function (req, res) {
  var data = "";  
  checkLoginStatus(req, res);
  con.query('SELECT username FROM member', function (err, rows) {
    if (err) {
      console.error(err);
      console.error("發生錯誤啦");        
    }         
    var data = rows;
    JSON.stringify(data);
    // console.log("我是資料：" + data);
    // res.send(data);
    res.render('index', {
      // loginStatus: false,
      member: data,
    });
  });  
});
router.get('/account', function (req, res) {
  res.render('account');
});
router.get('/cart', function (req, res) {
  res.render('cart');
});
router.get('/check', function (req, res) {
  res.render('check');
});
router.get('/checkover', function (req, res) {
  res.render('checkover');
});
router.get('/contact', function (req, res) {
  res.render('contact');
});
router.get('/member', function (req, res) {
  var data = "";
  con.query('SELECT username,email,tel,birth,address FROM member', function (err, rows) {
    if (err) {
      console.error(err);
      console.error("發生錯誤啦");
    }
    var data = rows;
    JSON.stringify(data);
    console.log(data);
    res.render('member', {
      data: data,
    });
  });  
});
router.get('/news', function (req, res) {
  res.render('news');
});
router.get('/order', function (req, res) {
  res.render('order');
});
router.get('/newpassword', function (req, res) {
  res.render('newpassword');
});

router.post('/testPost', function (req, res) {
  // var confirm;
  var sql = {
   oldpass: req.body.oldpass,
   newpass: req.body.newpass,
   newpass2: req.body.newpass2,
  };
  console.log(sql);
  con.query("UPDATE member SET password=" + sql[0].newpass + " WHERE password=" + sql[0].oldpass,sql,function(err,rows){
   if (err) {
      console.error(err);
   }
   console.log(rows);
  //  if(sql.newpass == sql.newpass2){
  //    res.render('newpassword',{
  //      confirm: '已成功變更密碼！'
  //    });
  //   } else {
  //    res.render('newpassword', {
  //      confirm: '新密碼與確認密碼不一致喔！'
  //    });
  //  }
    // console.log(confirm);
    res.redirect("/");    
  });
});
router.get('/product', function (req, res) {
  res.render('product');
});
router.get('/qa', function (req, res) {
  res.render('qa');
});
router.get('/login', function (req, res) {
  res.render('login');
  var sql = {
    account:req.body.account,
    password: req.body.password,
  };
  console.lgo(sql);
  // req.session.account = user;

});
router.get('/logout', function (req, res) {
  res.render('logout');
}); 
router.get('/register', function (req, res) {
  res.render('register');
});
router.post('/register1', function (req, res) {
  var sql = {
    username: req.body.username,
    email: req.body.email,
    tel: req.body.tel,
    cell: req.body.cell,
    birth: req.body.birth,
    address: req.body.address,
    account: req.body.account,
    password: req.body.password,
    allow: req.body.allow,
  };
  console.log(sql);
  con.query('INSERT INTO member SET ?', sql, function (err, rows) {
    if (err) {
      console.log(err);
    }
    // res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
    res.alert("恭喜你註冊成功！");
  });
});
//管理端
router.get('/admin', function (req, res) {
  res.render('backend/index');
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
router.get('/admin/news/list', function (req, res) {
  res.render('backend/news');
}); 
router.get('/admin/news/add', function (req, res) {
  res.render('backend/newsadd');
}); 
router.get('/admin/order/list', function (req, res) {
  res.render('backend/order');
});
router.get('/admin/product/list', function (req, res) {
  res.render('backend/product');
});
router.get('/admin/product/add', function (req, res) {
  res.render('backend/productadd');
});
router.get('/admin/suggest/list', function (req, res) {
  res.render('backend/suggest');
});
// router.get('我是在網址上出現的route名稱', function (req, res) {
//   res.render('我是view目錄下面的路徑位址');
// });


// con.end();
module.exports = router;
