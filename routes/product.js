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
  console.log(sql.productId);
  sqlQuery = 'SELECT * FROM cart_shopping WHERE PRODUCT_ID=(?);';
  con.query(sqlQuery,sql.productId,function(err,rows){
    var data = rows;
    var length = data.length;
    console.log("資料長度：" + length);    
    if (length == 0){
      sqlQuery = 'INSERT INTO cart_shopping (PRODUCT_ID) VALUE(?);';
      con.query(sqlQuery,sql.productId,function(err,rows){
        var data = rows;
        if (err) {console.log(err);}
        res.render('toAddCart', {
          loginStatus: loginStatus,
          username: req.session.username,
          data: data,
          message: '',
        })
      })
    } else if (length > 0){
      sqlQuery = 'UPDATE cart_shopping SET PRODUCT_AMOUNT=PRODUCT_AMOUNT+1 WHERE PRODUCT_ID=(?);'
      con.query(sqlQuery,sql.productId,function(err,rows){
        var data = rows;
        if (err) {console.log(err);}
        res.render('toAddCart', {
          loginStatus: loginStatus,
          username: req.session.username,
          data: data,
          message: '',
        })
      })   
    }
  })
});

router.get('/cart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  var sqlQuery = 'SELECT SUM(PD.price * CH.PRODUCT_AMOUNT) AS subtotal,' +
    ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.ID AS PD_ID' +
    ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.id' +
    ' GROUP BY CH.PRODUCT_ID, PD.id,CH.PRODUCT_AMOUNT;';
  con.query(sqlQuery,function(err,rows){
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

router.get('/ajaxUpdateCart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  var sql = {
    amount: parseInt(req.query.amount),
    productId: parseInt(req.query.productId),
  }
  console.log(sql.productId);
  console.log(sql.amount);
  var sqlQuery = 'UPDATE cart_shopping SET PRODUCT_AMOUNT = ? WHERE PRODUCT_ID= ? ;';
  con.query(sqlQuery,[sql.amount, sql.productId], function (err, rows) {
    var data = rows;
    if (err) { console.log(err); }
    var sqlQuery = 'SELECT SUM(PD.price * CH.PRODUCT_AMOUNT) AS subtotal,' +
      ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.ID AS PD_ID' +
      ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.id' +
      ' GROUP BY CH.PRODUCT_ID, PD.id,CH.PRODUCT_AMOUNT;';
    con.query(sqlQuery, function (err, rows) {
      var data = rows;
      console.log(data);
      if (err) { console.log(err); }
      res.render('ajax_cart', {
        loginStatus: loginStatus,
        username: req.session.username,
        message: '<sapn>尚未登入，請先進行<a href="/member/login">登入</a></sapn>',
        data: data,
      })
    });
  })
});

router.post('/ajaxDeleteCart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  var sql = {
    productId: req.body.productId,
  }
  console.log(typeof(sql.productId));
  var sqlQuery = 'DELETE FROM cart_shopping WHERE PRODUCT_ID= ? ;';
  con.query(sqlQuery, sql.productId, function (err, rows) {
    var data = rows;
    if (err) { console.log(err); }
    var sqlQuery = 'SELECT SUM(PD.price * CH.PRODUCT_AMOUNT) AS subtotal,' +
      ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.ID AS PD_ID' +
      ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.id' +
      ' GROUP BY CH.PRODUCT_ID, PD.id,CH.PRODUCT_AMOUNT;';
    con.query(sqlQuery, function (err, rows) {
      var data = rows;
      console.log(data);
      if (err) { console.log(err); }
      res.render('ajax_cart', {
        loginStatus: loginStatus,
        username: req.session.username,
        message: '<sapn>尚未登入，請先進行<a href="/member/login">登入</a></sapn>',
        data: data,
      })
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
