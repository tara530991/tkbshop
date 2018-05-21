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
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);  
  console.log("登入次數：" + req.session.views);  
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
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);  
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
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);  
  var sql = {
    productId: req.body.productId,
  };
  console.log(sql.productId);
  sqlQuery = 'SELECT * FROM cart_shopping WHERE MEMBER_EMAIL= ? && PRODUCT_ID= ? && status="on" ;';
  con.query(sqlQuery, [req.session.email, sql.productId],function(err,rows){
    var data = rows;
    console.log(data);
    // console.log("資料長度：" + data.length);
      if (data.length == 0 || data.length == null) {
        sqlQuery = 'INSERT INTO cart_shopping (MEMBER_EMAIL,PRODUCT_ID,PRODUCT_AMOUNT,addtime) VALUE(?,?,1,NOW());';
        con.query(sqlQuery, [req.session.email, sql.productId], function (err, rows) {
          var data = rows;
          if (err) { console.log(err); }
          res.render('toCart', {
            loginStatus: loginStatus,
            username: req.session.username,
            data: data,
            message: '<span>購物車裡還沒有東西喔\n趕快去選購吧</sapn>',
          })
        })
      } else if (data.length > 0) {
        sqlQuery = 'UPDATE cart_shopping SET PRODUCT_AMOUNT=PRODUCT_AMOUNT+1,' +
        ' lastchangetime=NOW() WHERE MEMBER_EMAIL=? && PRODUCT_ID=?;';
        con.query(sqlQuery, [req.session.email, sql.productId], function (err, rows) {
          var data = rows;
          if (err) { console.log(err); }
          res.render('toCart', {
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
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  var sql = {
    email:req.session.email,
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);  
  var sqlQuery = 'SELECT SUM(PD.price * CH.PRODUCT_AMOUNT) AS subtotal,' +
    ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.product_id AS PD_ID' +
    ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.product_id' +
    ' WHERE MEMBER_EMAIL=? && status="on"' +
    ' GROUP BY CH.PRODUCT_ID, PD.product_id,CH.PRODUCT_AMOUNT;';
  con.query(sqlQuery,sql.email,function(err,rows){
    var data = rows;
    console.log(data);
    if(err){console.log(err);}
    res.render('cart',{
      loginStatus: loginStatus,
      username: req.session.username,                                          
      message: '<sapn>尚未登入，請先進行<a href="/member/login">登入</a></sapn>',       
      message2: '<sapn>購物車裡還沒有東西喔</sapn>',       
      data:data,
    });
  })
});

//購物車加減數量鍵
router.get('/ajaxUpdateCart', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);  
  var sql = {
    email: req.session.email,    
    amount: parseInt(req.query.amount),
    productId: parseInt(req.query.productId),
  }
  console.log(sql.productId);
  console.log(sql.amount);
  var sqlQuery = "UPDATE cart_shopping SET PRODUCT_AMOUNT=?,lastchangetime=NOW() WHERE PRODUCT_ID= ? && MEMBER_EMAIL= ? ;";
  con.query(sqlQuery,[sql.amount, sql.productId, sql.email], function (err, rows) {
    var data = rows;
    if (err) { console.log(err); }
    var sqlQuery = 'SELECT SUM(PD.price * CH.PRODUCT_AMOUNT) AS subtotal,' +
      ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.product_id AS PD_ID' +
      ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.product_id' +
      ' WHERE MEMBER_EMAIL=? && status="on"' +
      ' GROUP BY CH.PRODUCT_ID, PD.product_id, CH.PRODUCT_AMOUNT;';
    con.query(sqlQuery,sql.email, function (err, rows) {
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

//購物車刪除鍵
router.post('/ajaxDeleteCart', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);  
  var sql = {
    email: req.session.email,
    productId: parseInt(req.body.productId),
  }
  console.log(typeof(sql.productId));
  var sqlQuery = "UPDATE cart_shopping SET status='down',downtime=NOW() WHERE PRODUCT_ID= ? && MEMBER_EMAIL= ? ;";
  con.query(sqlQuery, [sql.productId,sql.email], function (err, rows) {
    var data = rows;
    if (err) { console.log(err); }
    var sqlQuery = 'SELECT SUM(PD.price * CH.PRODUCT_AMOUNT) AS subtotal,' +
      ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.product_id AS PD_ID' +
      ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.product_id' +
      ' WHERE MEMBER_EMAIL=? && status="on" ' +
      ' GROUP BY CH.PRODUCT_ID, PD.product_id, CH.PRODUCT_AMOUNT;';
    con.query(sqlQuery, sql.email, function (err, rows) {
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

router.post('/check', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);
  var sql = {
    email: req.session.email,
  }  
  var sqlQuery = 'SELECT SUM(PD.price * CH.PRODUCT_AMOUNT) AS subtotal,' +
    ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.product_id AS PD_ID' +
    ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.product_id' +
    ' WHERE MEMBER_EMAIL=? && status="on" ' +
    ' GROUP BY CH.PRODUCT_ID, PD.product_id, CH.PRODUCT_AMOUNT;';
  con.query(sqlQuery, sql.email, function(err,rows){
    var data = rows;
    console.log(data);
    if (err) { console.log(err)}; 
    res.render('check',{
      loginStatus: loginStatus,
      username: req.session.username,
      message: '<sapn>尚未登入，請先進行<a href="/member/login">登入</a></sapn>',
      data: data,
    });
  });
});

router.post('/check1', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  } else {
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);
  var sql = {
    email: req.session.email,
    total: req.body.total,
    buyer: req.body.buyer,
    address: req.body.address,
    receipt: req.body.receipt,
    invoiceTitle: req.body.invoiceTitle,
    invoiceNumber: req.body.invoiceNumber,
    payMethod: req.body.payMethod,
  }
  var sqlQuery = 'INSERT INTO order_detail (MEMBER_EMAIL, addtime, total, buyer, address,' +
    ' receipt, invoiceTitle, invoiceNumber, payMethod) VALUE (?,NOW(),?,?,?,?,?,?,?);';
  sqlQuery += 'INSERT INTO order_product';
  con.query(sqlQuery, [sql.email, sql.total, sql.buyer, sql.address, sql.receipt, 
    sql.invoiceTitle, sql.invoiceNumber, sql.payMethod],function(err,rows){
      var data = rows;
      console.log(data);
      if (err) { console.log(err); }
      var sqlQuery = 'UPDATE cart_shopping SET status="check",downtime=NOW()' + 
        ' WHERE MEMBER_EMAIL=? && status="on";';
      con.query(sqlQuery, sql.email, function(err,rows){ 
        var data = rows;
        console.log(data);
        if (err) { console.log(err); }
        res.render('toCheck', {
          loginStatus: loginStatus,
          username: req.session.username,
          message: '結帳完成，訂單已送出',
          data: data,
        });
      });
  })
})
router.post('/orderNumber', function (req, res) {
  var sql = {
    orderNumber: req.body.orderNumber,
  }
  console.log(sql.orderNumber);
  var sqlQuery = "SELECT MAX(order_id) AS maxid FROM order_detail WHERE order_id IN" + 
    " (SELECT order_id FROM order_detail WHERE order_id LIKE '" + sql.orderNumber + "%');";
  con.query(sqlQuery, function(err,rows){
    var data = rows;
    console.log(data);
    var num = data[0].maxid;
    console.log(num);
    var num2 = (num.substring(9,13)).replace(/\b(0+)/gi,"");
    console.log(num2);
    var num3 = parseInt(num2) + 1;
    console.log(num3);
    var num4 = (Array(4).join("0") + num3).slice(-4);
    console.log(num4);
    var serialNum = sql.orderNumber + num4;
    console.log(serialNum);
  })
})
router.post('/checkover', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  }else{
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views); 
  var sql 
  res.render('checkover',{
    loginStatus: loginStatus,
    username: req.session.username,
    message: '<sapn>尚未登入，請先進行<a href="/member/login">登入</a></sapn>',
    data: data,
  });
});

router.get('/order', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  } else {
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);  
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
