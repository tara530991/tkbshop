var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });

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
  con.query('INSERT INTO cart_shopping (PRODUCT_ID) VALUE(?)', sql.productId, function (err, rows) {
    if (err) {
      console.log(err);
    }
    var cartlist = 'SELECT CH.*,pd.* FROM tkbshop.cart_shopping AS CH LEFT JOIN tkbshop.product pd on CH.PRODUCT_ID = pd.id';
    con.query(cartlist, function (err, rows) {
      if (err) {
        console.log(err);
      }
      res.render('cart', {
        loginStatus: loginStatus,             
        message: '',
      });
    })
    // res.setHeader('Content-Type', 'application/json');
  })
});


router.get('/cart', function (req, res) {
  var loginStatus = false;
  if (req.session.email) {
    loginStatus = true;
  }
  // var cartlist = 'SELECT cart_shopping.*,product.* FROM cart_shopping;LEFT JOIN product on cart_shopping.PRODUCT_ID = product.id'
  var cartlist = 'SELECT `CH`.*,`pd`.* FROM tkbshop.`cart_shopping` AS `CH` LEFT JOIN tkbshop.`product` pd on `CH`.PRODUCT_ID = `pd`.id;'
  con.query(cartlist,function(err,rows){
    var data = rows;
    console.log(data);
    if(err){console.log(err);}
    res.render('cart',{
      loginStatus: loginStatus,
      message: '<sapn>尚未登入，請先進行<a href=" / login">登入</a></sapn>',       
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
        data: data,
      });
    });
  });

module.exports = router;
