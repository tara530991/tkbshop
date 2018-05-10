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
  console.log(req.query.sort);
  sqlQuery = ' SELECT * FROM product ';
  con.query(sqlQuery,function(err,rows){
    var data = rows;
    res.render('product',{
      loginStatus: loginStatus,     
      username: req.session.username,                                          
      data : data,
    });
  })
});

router.get('/ajaxProduct', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  } 
  // console.log(req.query.sort);
  sqlQuery = ' SELECT * FROM product ';
  if (req.query.sort==1){
    sqlQuery +=' ORDER BY price ASC ';
  } else if (req.query.sort == 2){
    sqlQuery += ' ORDER BY price DESC ';
  }
  con.query(sqlQuery,function(err,rows){
    var data = rows;
    res.render('ajax_product',{
      loginStatus: loginStatus,     
      username: req.session.username,                                          
      data : data,
    });
  })
});

router.post('/addToCart', function (req, res) {
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
  var cartList = 'SELECT SUM(CH.PRODUCT_AMOUNT) '+
  ' AS amount , SUM(CH.PRODUCT_AMOUNT) * PD.price AS subtotal '+
  ' , PD.price, PD.product_name,PD.ID AS PD_ID FROM ' +
  ' cart_shopping CH LEFT JOIN product PD '+ 
  ' on CH.PRODUCT_ID = PD.id GROUP BY CH.PRODUCT_ID;';
  con.query(cartList, function (err, rows) {
    var data = rows;
    console.log(data);
    if (err) {console.log(err);}
    res.render('toAddCart', {
      loginStatus: loginStatus,
      username: req.session.username,
      data: data,
      message: '',
    });
  });
});

router.get('/cart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  var cartlist = 'SELECT SUM(CH.PRODUCT_AMOUNT) AS amount , ' +
  ' SUM(CH.PRODUCT_AMOUNT) * PD.price AS subtotal , ' +
  ' PD.price, PD.product_name FROM cart_shopping CH ' +
  ' LEFT JOIN product PD on CH.PRODUCT_ID = PD.id ' +
  ' GROUP BY CH.PRODUCT_ID;';

  con.query(cartlist,function(err,rows){
    var data = rows;
    // console.log(data);
    if(err){console.log(err);}
    res.render('cart',{
      loginStatus: loginStatus,
      username: req.session.username,                                          
      message: '<sapn>尚未登入，請先進行<a href="/member/login">登入</a></sapn>',       
      data:data,
    });
  })
});

router.post('/deleteproduct', function (req, res) {

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
