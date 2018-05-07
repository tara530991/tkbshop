var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });
var loginStatus = false;

//前端
router.get('/', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  } 
  con.query('SELECT * FROM product',function(err,rows){
    var data = rows;
    res.render('product',{
      loginStatus: loginStatus,     
      username: req.session.username,                                          
      data : data,
    });
  })
});
router.post('/addTocart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  var sql = {
    productId: req.body.productId,
  };
  var cartAdd = 'INSERT INTO cart_shopping (PRODUCT_ID) VALUE(?);';
  con.query(cartAdd, sql.productId, function (err, rows) {
    var data = rows;
    if (err) {console.log(err);}
  })
  //合併顯示購物車與產品列表（檢視表）
  var cartList = 'SELECT SUM(CH.PRODUCT_AMOUNT) AS amount , SUM(CH.PRODUCT_AMOUNT) * PD.price AS subtotal , PD.price, PD.product_name FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID = PD.id GROUP BY CH.PRODUCT_ID;';
  con.query(cartList, function (err, rows) {
    var data = rows;
    console.log(data);
    if (err) {console.log(err);}

    // con.query('SELECT SUM(subtotal) AS total;', function (err, rows) {
    //   // var total = rows;
    //   // return total;
    //   console.log(rows);
    // })
   })
  var cartsubtotal = 'SELECT SUM(PRODUCT_AMOUNT) as subtotal FROM cart_shopping GROUP BY PRODUCT_ID;';
  con.query(cartsubtotal,function(err,rows){
    var data = rows;
    console.log(data);
    if(err){console.log(err);}
    
  })
  //product.product,product.price,product.category,
  var cartIDsame = 'SELECT * WHERE (PRODUCT_ID) IN (SELECT * FROM cart_shopping DISTINCT PRODUCT_ID GROUP BY PRODUCT_ID);';
  con.query(cartIDsame,function(err,rows){
    var data = rows;
    console.log(data);    
    if (err) { console.log(err); }
    res.render('cart', {
      loginStatus: loginStatus,
      username: req.session.username,                                          
      data: data,
      // total:total,
      message: '',
    });
  });
});

router.get('/cart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  var cartlist = 'SELECT ch.*,pd.product,pd.price,pd.category FROM tkbshop.cart_shopping ch LEFT JOIN tkbshop.product pd on ch.PRODUCT_ID = pd.id;'
  con.query(cartlist,function(err,rows){
    var data = rows;
    console.log(data);
    if(err){console.log(err);}
    res.render('cart',{
      loginStatus: loginStatus,
      username: req.session.username,                                          
      message: '<sapn>尚未登入，請先進行<a href="/member/login">登入</a></sapn>',       
      data:data,
    });
  })
  
});
router.get('/check', function (req, res) {
  var loginStatus = false;

  if (req.session.email) {
    loginStatus = true;
  }
  res.render('check',{
  });
});
router.get('/checkover', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  res.render('checkover',{
  });
});
router.get('/order', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  con.query('SELECT * FROM order', function (err, rows) {
    var data = rows;
    res.render('order', {
      loginStatus: loginStatus,           
      username: req.session.username,                                          
      data: data,
    });
  });
});

module.exports = router;
