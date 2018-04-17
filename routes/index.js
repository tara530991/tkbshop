var express = require('express');
var router = express.Router();

// 在每一個請求被處理之前都會執行的middleware
router.use(function (req, res, next) {
  // 輸出記錄訊息至終端機
  console.log(req.method, req.url);
  // 繼續路由處理
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/account', function (req, res) {
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.phone);
  console.log(req.body.address);
});

/* GET page router. */
//前端
router.get('/app', function (req, res) {
  res.render('app');
});
router.get('/', function (req, res) {
  res.render('index');
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
router.get('/contact', function (req, res) {
  res.render('contact');
});
router.get('/member', function (req, res) {
  res.render('member');
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
router.get('/signin', function (req, res) {
  res.render('signin');
});
router.get('/register', function (req, res) {
  res.render('register');
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
router.get('我是在網址上出現的名稱', function (req, res) {
  res.render('我是');
});

module.exports = router;
