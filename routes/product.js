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
var transporter = require('./email');

function statusTransform(statusNum){
  // console.log("狀態" + statusNum);
  switch (statusNum) {
    case '01': status = "訂單處理中"; break;
    case '02': status = "待轉帳"; break;
    case '03': status = "物流運送中"; break;
    case '04': status = "訂單完成"; break;
    case '11': status = "退貨申請送出"; break;
    case '12': status = "退貨申請-收取退貨"; break;
    case '13': status = "退貨申請-物流取貨"; break;
    case '14': status = "退貨申請-退款完成"; break;
    case '99': status = "訂單取消"; break;
  }
  // console.log("狀態" + status);
  return status;
}

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
  var startcount = 0;
  var search = null;
  var sqlQuery = 'SELECT COUNT(product_id) AS len FROM product';
  con.query(sqlQuery,  function (err, rows) {
    var data = rows;
    var count = data[0].len;  //筆數
    var pages = Math.round(count / 6) + 1;  //總頁數
    console.log("資料筆數：" + count);
    console.log("總頁數：" + pages);
    console.log("資料開始抓取起始數：" + startcount);    
    sqlQuery = 'SELECT * FROM product LIMIT ?,6';
    con.query(sqlQuery, startcount, function (err, rows) {
      var data = rows;
      // console.log(data);
      res.render('product',{
        loginStatus: loginStatus,     
        username: req.session.username,                                          
        data : data,
        count: count,
        pages: pages,
        serach: search,
        moment: moment,
      });
    });
  });
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
  var sql = {
    sort: req.query.sort,
    search: req.query.search, 
    nowPage: req.query.nowPage,
    pages: req.query.pages,
    count: req.query.count,
  }
  if(sql.noPage == null){
    sql.nowPage = 1;
  }
  console.log("排序方式：" + sql.sort);
  console.log("前台點選頁數：" + sql.nowPage);
  console.log("總頁數：" + sql.pages);
  console.log("搜尋詞：" + sql.search);
  console.log("總資料筆數：" + sql.count);
  var startcount = 0;
  if (sql.nowPage > sql.pages || sql.nowPage == 0){
    //第一頁與最後一頁做不動作
    console.log(1);
  }else{
    if (sql.sort == "" && sql.search == ""){
      //只有換頁動作
    console.log(2);      
      var startcount = (sql.nowPage - 1) * 6; //預設第1頁為0，0、6、12...
      console.log("資料開始抓取起始數：" + startcount);    
      var sqlQuery = 'SELECT * FROM product LIMIT ?,6';
      con.query(sqlQuery, startcount, function (err, rows) {
        var data = rows;
        // console.log(data);
        res.render('ajax_product', {
          loginStatus: loginStatus,
          username: req.session.username,
          data: data,
          count: sql.count,
          nowPage: sql.nowPage,        
          pages: sql.pages,
          serach: sql.search,
          moment: moment,
        });
      });
    } else {
      //包含查詢條件或排序條件的情況
      console.log(3);
      var sqlQuery = "SELECT COUNT(product_id) AS len FROM product WHERE concat(product_name,description)" + 
      " LIKE '%" + sql.search + "%'";
      con.query(sqlQuery, function (err, rows) {
        if (err) {console.log(err);}      
        var data = rows;
        var count = data[0].len; //筆數
        var pages = Math.round(count / 6) + 1; //總頁數
        var startcount = (sql.nowPage - 1) * 6; //預設第1頁為0，0、6、12...
        console.log("總資料筆數：" + count);
        console.log("總頁數：" + pages);
        console.log("資料開始抓取起始數：" + startcount);    
        var sqlQuery = "SELECT * FROM product WHERE concat(product_name,description) LIKE '%" + 
          sql.search + "%' ORDER BY price ";
          if (sql.sort == 1) {　sqlQuery += " ASC ";
        } else if (sql.sort == 2) { sqlQuery+= " DESC "; }
        sqlQuery +=" LIMIT ?, 6;";
        con.query(sqlQuery, startcount, function (err, rows) {  
          if (err) {console.log(err);}      
          var data = rows;
          console.log(data);
          res.render('ajax_product',{
            loginStatus: loginStatus,     
            username: req.session.username,                                          
            nowPage: sql.nowPage,
            data: data, 
            count: count,
            pages: pages,
            search: sql.search,
            moment: moment,
          });
        });
      });
    }
  }
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
    email: req.session.email,
    productId: req.body.productId,
    productAmount: req.body.productAmount,
  };
  console.log(sql);
  sqlQuery = 'SELECT * FROM cart_shopping WHERE MEMBER_EMAIL= ? && PRODUCT_ID= ? && status="on" ;';
  con.query(sqlQuery, [sql.email, sql.productId],function(err,rows){
    var data = rows;
    console.log(data);
    // console.log("資料長度：" + data.length);
      if (data.length == 0 || data.length == null) {
        sqlQuery = 'INSERT INTO cart_shopping (MEMBER_EMAIL,PRODUCT_ID,PRODUCT_AMOUNT,addtime) VALUE(?,?,?,NOW());';
        con.query(sqlQuery, [sql.email, sql.productId, sql.productAmount], function (err, rows) {
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
        sqlQuery = 'UPDATE cart_shopping SET PRODUCT_AMOUNT=PRODUCT_AMOUNT+?,' +
        ' lastchangetime=NOW() WHERE MEMBER_EMAIL=? && PRODUCT_ID=?;';
        con.query(sqlQuery, [sql.productAmount,sql.email, sql.productId], function (err, rows) {
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
    ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.pic, PD.product_id AS PD_ID' +
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
      message: '<span>尚未登入，請先進行<a href="/member/login">登入</a></span>',       
      message2: '<span>購物車裡還沒有東西喔<br>快來看看我們的<a href="/product">產品</a>吧</span>',       
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
      ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.pic, PD.product_id AS PD_ID' +
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
      ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.pic, PD.product_id AS PD_ID' +
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
    ' CH.PRODUCT_AMOUNT, PD.price, PD.product_name, PD.pic, PD.product_id AS PD_ID' +
    ' FROM cart_shopping CH LEFT JOIN product PD on CH.PRODUCT_ID=PD.product_id' +
    ' WHERE MEMBER_EMAIL=? && status="on" ' +
    ' GROUP BY CH.PRODUCT_ID, PD.product_id, CH.PRODUCT_AMOUNT;';
  con.query(sqlQuery, sql.email, function(err,rows){
    var data = rows;
    console.log(data);
    if (err) { console.log(err);} 
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
    username: req.session.username,
    email: req.session.email,
    orderNumber: req.body.orderNumber,
    productId: req.body.productId,
    productAmount: req.body.productAmount,
    total: req.body.total,
    buyer: req.body.buyer,
    address: req.body.address,
    receipt: req.body.receipt,
    invoiceTitle: req.body.invoiceTitle,
    invoiceNumber: req.body.invoiceNumber,
    payMethod: req.body.payMethod,
  }
  var productId = sql.productId;
  var productAmount = sql.productAmount;
  console.log(sql);
  var sqlQuery = "SELECT MAX(order_id) AS maxid FROM order_detail WHERE order_id IN" +
    " (SELECT order_id FROM order_detail WHERE order_id LIKE '" + sql.orderNumber + "%');";
  con.query(sqlQuery, function (err, rows) {
    var data = rows;      
    var serialNum = "";
    console.log(data);      
    var num = data[0].maxid;
    if (num !== null){
      num = (num.substring(9, 13)).replace(/\b(0+)/gi, "");
      num = parseInt(num) + 1;
      num = (Array(4).join("0") + num).slice(-4);
      serialNum = sql.orderNumber + num;
    } else if (num == null) {
      serialNum = sql.orderNumber + "0001";
    }
    console.log("流水號：" + serialNum);
    var sqlQuery = 'INSERT INTO order_detail (order_id,MEMBER_EMAIL, addtime, total, buyer, address,' +
      ' receipt, invoiceTitle, invoiceNumber, payMethod) VALUE (?,?,NOW(),?,?,?,?,?,?,?);';
    con.query(sqlQuery, [serialNum, sql.email, sql.total, sql.buyer, sql.address, sql.receipt, 
      sql.invoiceTitle, sql.invoiceNumber, sql.payMethod],function(err,rows){
        var data = rows;
        console.log(data);
        if (err) { console.log(err);　}
      });
    for (var i = 0; i < productId.length; i++) {
      var obj = new Object();
      obj.id = productId[i];
      obj.amount = productAmount[i];
      var Obj = Object.assign(obj);
      // console.log(Obj);       
      var sqlQuery2 = 'INSERT INTO order_product (order_id, product_id, amount) VALUE (?,?,?);';
      con.query(sqlQuery2, [serialNum, Obj.id, Obj.amount], function (err, rows) {
        var data = rows;
        console.log(rows);
        if (err) {console.log(err);}
      });
    }
    con.query('INSERT INTO order_payment (order_id) VALUE (?);', serialNum, function(err, rows) {
      var data = rows;
      console.log(data);
      if (err) { console.log(err); }
    });
    var sqlQuery3 = 'UPDATE cart_shopping SET status="check",downtime=NOW()' + 
      ' WHERE MEMBER_EMAIL=? && status="on";';
    con.query(sqlQuery3, sql.email, function(err,rows){ 
      var data = rows;
      console.log(data);
      if (err) { console.log(err); }
      var Email = {
        from: "tara530991@gmail.com",
        to: sql.email,
        subject: "訂單已送出",
        html: "<p>親愛的" + 　sql.username + "你好<br>我們已經收到你的訂單囉<br>" + 
        "，請在48小時內完成ATM轉帳動作<br>我們將盡快為您出貨<br>" + 
        "這是你的訂單編號：" + serialNum + "</p><br>"
      };
      // console.log(Email);
      transporter.sendMail(Email, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("訊息已經完成傳送: " + info.response);
        }
      });
      res.render('toCheck', {
        loginStatus: loginStatus,
        username: req.session.username,
        message: '結帳完成，訂單已送出',
        data: data,
        serialNum: serialNum,
      });
    });
  });
});

router.get('/checkover', function (req, res) {
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
    serialNum: req.query.serialNum,
  }
  console.log(sql.serialNum);
      res.render('checkover',{
        loginStatus: loginStatus,
        username: req.session.username,
        message: '',
        serialNum: sql.serialNum,
      });
});

router.get('/ordersearch', function (req, res) {
  if (req.session.email) {
    loginStatus = true;
    req.session.views++;
  } else {
    loginStatus = false;
    req.session.views = 1;
  }
  console.log("登入狀態：" + loginStatus);
  console.log("登入次數：" + req.session.views);  
  res.render('ordersearch', {
    loginStatus: loginStatus,
    username: req.session.username,
    message: '',
  });
});

router.get('/orderlist', function (req, res) {
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
    orderId: req.body.orderId,
  }
  var sqlQuery = 'SELECT * FROM order_detail WHERE MEMBER_EMAIL=? ORDER BY addtime';
  const newLocal = 'orderlist';
  con.query(sqlQuery, sql.email, function (err, rows) {
    var data = rows;
    console.log(data);
    if (err) { console.log(err); }
    var statusArray = new Array();
    for (var i = 0; i < data.length; i++) {
      statusArray.push(statusTransform(data[i].status));
    }
    console.log(statusArray);
    res.render('orderlist', {
      loginStatus: loginStatus,
      username: req.session.username,
      data: data,
      statusArray: statusArray,
      moment: moment,
      message: '',
    });
  })
})

router.post('/order', function (req, res) {
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
    orderId: req.body.orderId,
  }
  console.log(sql.orderId);
  var sqlQuery = 'SELECT * FROM order_detail WHERE order_id=?';
  con.query(sqlQuery, sql.orderId, function (err, rows) {
    var data = rows;
    console.log(data);
    if (err) { console.log(err); }
    if (data == 0){
      res.render('toOrderSearch', {
        loginStatus: loginStatus,           
        username: req.session.username,
        message: '訂單號碼不存在',
      });
    }else{
      var sqlQuery2 = 'SELECT OP.product_id, OP.amount, P.product_name, P.pic, P.price,' + 
      ' SUM(OP.amount * P.price) AS subtotal FROM order_product OP LEFT JOIN product P' +
      ' ON OP.product_id = P.product_id WHERE order_id=?' + 
      ' GROUP BY OP.product_id, OP.amount;';
      con.query(sqlQuery2, sql.orderId, function (err, rows) {
        var data2 = rows;
        console.log(data2);
        if (err) { console.log(err); }
        var statusArray = new Array();      
        statusArray.push(statusTransform(data[0].status));
        res.render('order', {
          loginStatus: loginStatus,           
          username: req.session.username,
          moment:moment, 
          statusArray: statusArray,                                         
          data: data,
          data2: data2,
          message: '',
        });
      });
    }
  })
});

router.post('/orderContent', function (req, res) {
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
    orderId: req.body.orderId,
  }
  console.log(sql.orderId);
  var sqlQuery = 'SELECT * FROM order_detail WHERE order_id=?';
  con.query(sqlQuery, sql.orderId, function (err, rows) {
    var data = rows;
    console.log(data);
    if (err) {console.log(err);}
    var sqlQuery2 = 'SELECT OP.product_id, OP.amount, P.product_name, P.pic, P.price,' +
      ' SUM(OP.amount * P.price) AS subtotal FROM order_product OP LEFT JOIN product P' +
      ' ON OP.product_id = P.product_id WHERE order_id=?' +
      ' GROUP BY OP.product_id, OP.amount;';
    con.query(sqlQuery2, sql.orderId, function (err, rows) {
      var data2 = rows;
      console.log(data2);
      if (err) {
        console.log(err);
      }
      var statusArray = new Array();
      statusArray.push(statusTransform(data[0].status));
      res.render('ordercontent', {
        loginStatus: loginStatus,
        username: req.session.username,
        moment: moment,
        statusArray: statusArray,
        data: data,
        data2: data2,
        message: '',
      });
    });
  });
});

module.exports = router;
