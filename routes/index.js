var express = require('express');
var router = express.Router();
var http = require('http');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "tkbshop",
});

// 在每一個請求被處理之前都會執行的middleware
router.use(function (req, res, next) {
  // 輸出記錄訊息至終端機
  console.log(req.method, req.url);
  // 繼續路由處理
  next();
});

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

// var rows;

// console.log(member.rows);
// console.log(data.address);
// con.query('SELECT * FROM member', function (err, rows) {
//     if (err) {
//       console.error(err);
//     }
//     // var data = JSON.stringify(rows);
//       // console.log(data);
//       // return data;
//       // var username = rows.username;
//       // console.log(data);
//           res.render('index', {
//       title: 'Express',
//       loginStatus: false,
//       username: name
//      });
// });


router.get('/', function (req, res) {
  // res.render('index', {});
      // res.render('index', {
    //   title: 'Express',
    //   loginStatus: false,
    //   username: name
    //  });
  // var cmd = 'SELECT * FROM member WHERE username = ?';
  var cmd = 'SELECT username FROM member';  
    con.query(cmd, function (err, rows) {
      // var data = rows;
      if (err) {
        console.error(err);
      }     
      // console.log(row);
    res.render('index', {
      loginStatus: false,
      // username: cmd,
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
  res.render('member.ejs');
});
router.get('/news', function (req, res) {
  res.render('news');
});
router.get('/order', function (req, res) {
  res.render('order');
});
router.get('/password', function (req, res) {
  res.render('password');
});
router.get('/product', function (req, res) {
  res.render('product');
});
router.get('/qa', function (req, res) {
  res.render('qa');
});
router.get('/login', function (req, res) {
  res.render('login');
});
router.get('/logout', function (req, res) {
  res.render('logout');
}); 
router.get('/register', function (req, res) {
  res.render('register');
  var db = req.con;
  var sql = {
    username: req.body.username,
    email: req.body.email,
    tel: req.body.tel,
    birth: req.body.birth,
    address: req.body.address,
    account:req.body.account,
    password: req.body.password,
    password2: req.body.password2,
    allow: req.body.allow,
  };
  console.log(sql);
  var query = db.query('INSERT INTO member', sql, function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
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


con.end();
module.exports = router;
