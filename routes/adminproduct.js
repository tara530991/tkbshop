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
    con.query('SELECT * FROM product_category ',function(err,rows){
        var data = rows;
        if(err){
            console.log(err);
        }
        res.render('backend/category',{
            data: data,
            moment: moment,
        });
    });
});
router.get('/category-add', function (req, res) {
  res.render('backend/categoryadd');
});
router.get('/product-list', function (req, res) {
    con.query('SELECT * FROM product',function(err,rows){
        var data = rows;
        if(err){
            console.log(err);
        }
        res.render('backend/product',{
            data: data,
            moment: moment,
        });
    });
});
router.get('/admin/product-add', function (req, res) {
    res.render('backend/productadd',{
        message: "",
    });
});
router.post('/admin/product-add1',upload.single('pic'), function (req, res) {
    var sql = {
        product: req.body.product,
        price: req.body.price,
        amount: req.body.amount,
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
    var querySQL = "INSERT INTO product(product,price,amount,uptime,downtime,description,addtime,changetime,ident,sort,category) VALUE(?,?,?,?,?,?,?,?,?,?,?)";
    con.query(querySQL, [sql.product, sql.price, sql.amount, sql.uptime, sql.downtime, sql.description, sql.addtime, sql.changetime, sql.ident,sql.sort,sql.category],function(err,rows){
        if(err){
            console.log(err);
        }
        var data = rows;
        console.log(data);
        res.render('backend/productadd', {
            message: '<span>產品新增成功</span>',
        });
    });
});
router.get('/admin/order-list', function (req, res) {
    res.render('backend/order');
});

module.exports = router;