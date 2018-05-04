var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var upload = multer({ dest: './public/upload/' });
var moment = require('moment');

//管理端
router.get('/category-list', function (req, res) {
    var loginStatus = false;
    req.session.admin = 1;
    if (req.session.admin > 1) {
        loginStatus = true;
    }
    con.query('SELECT * FROM product_category ',function(err,rows){
        var data = rows;
        if(err){
            console.log(err);
        }
        res.render('backend/category',{
            loginStatus: loginStatus,      
            data: data,
            moment: moment,
        });
    });
});
router.get('/category-add', function (req, res) {
    var loginStatus = false;
    req.session.admin = 1;
    if (req.session.admin > 1) {
        loginStatus = true;
    }
    res.render('backend/categoryadd',{
        loginStatus: loginStatus,      
        message: "",
  });
});
router.post('/category-add1', function (req, res) {
    var loginStatus = false;
    req.session.admin = 1;
    if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        category: req.body.category,
        sort:req.body.sort,
    }
    var querySQL = 'INSERT INTO product_category(category,sort) VALUE (?,?)'; 
    con.query(querySQL,[sql.category, sql.sort],function(err,rows){
        if (err) {
            console.log(err);
        }
        res.render('backend/categoryadd', {
            loginStatus: loginStatus,      
            message: '<span class="alert alert-success">產品類別新增成功</span>',
        });
    })
});

router.get('/product-list', function (req, res) {
    var loginStatus = false;
    req.session.admin = 1;
    if (req.session.admin > 1) {
        loginStatus = true;
    }
    con.query('SELECT * FROM product',function(err,rows){
        var data = rows;
        if(err){
            console.log(err);
        }
        res.render('backend/product',{
            loginStatus: loginStatus,      
            data: data,
            moment: moment,
        });
    });
});
router.get('/product-add', function (req, res) {
    var loginStatus; 
    if (req.session.admin <= 1) {
        loginStatus = false;
    } else if (req.session.admin > 1) {
        loginStatus = true;
    }
    console.log(req.session.admin);
    res.render('backend/productadd',{
        loginStatus: loginStatus,      
        message: "",
    });
});
router.post('/product-add1',upload.single('pic'), function (req, res) {
    if (req.session.admin <= 1) {
        loginStatus = false;
    } else if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        product: req.body.product,
        price: req.body.price,
        stock: req.body.stock,
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
    var querySQL = "INSERT INTO product(product,price,stock,uptime,downtime,description,addtime,changetime,ident,sort,category) VALUE(?,?,?,?,?,?,?,?,?,?,?)";
    con.query(querySQL, [sql.product, sql.price, sql.stock , sql.uptime, sql.downtime, sql.description, sql.addtime, sql.changetime, sql.ident,sql.sort,sql.category],function(err,rows){
        if(err){
            console.log(err);
        }
        var data = rows;
        console.log(data);
        res.render('backend/productadd', {
            loginStatus: loginStatus,      
            message: '<span class="alert alert-success">產品新增成功</span>',
        });
    });
});

router.get('/order-list', function (req, res) {
    req.session.admin = 1;
    if (req.session.admin <= 1){
        loginStatus = false;
    }else if(req.session.admin > 1) {
        loginStatus = true;
    }
    res.render('backend/order',{
        loginStatus: loginStatus,              
        moment: moment,    
    });
});

module.exports = router;