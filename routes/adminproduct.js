var express = require('express');
var router = express.Router();
var con = require('./sql');
var events = require('events');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var moment = require('moment');
var loginStatus = false;
// 圖片上傳
var multer = require('multer');
// var upload = multer({ dest: 'public/upload/' });
var path = require('path');
const storage = multer.diskStorage({
    destination: path.join('public/upload/'),
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(path.extname(file.originalname),"") +
         '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage}).single('pic');

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
    if (sql.category == "" || sql.category == undefined){
        res.render('backend/categoryadd', {
            loginStatus: loginStatus,
            message: '<span class="alert alert-danger">請確實輸入資料</span>',
        });
    }else{
        var querySQL = 'INSERT INTO product_category(category,sort) VALUE (?,?)'; 
        con.query(querySQL,[sql.category, sql.sort],function(err,rows){
            if (err) {console.log(err);}
            var data = rows;
            console.log(data);
            res.render('backend/categoryadd', {
                loginStatus: loginStatus,      
                message: '<span class="alert alert-success">產品類別新增成功</span>',
            });
        })
    }
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
router.get('/product-list', function (req, res) {
    var loginStatus = false;
    req.session.admin = 1;
    if (req.session.admin > 1) {
        loginStatus = true;
    }
    con.query('SELECT * FROM product', function (err, rows) {
        var data = rows;
        if (err) {console.log(err);}
        res.render('backend/product', {
            loginStatus: loginStatus,
            data: data,
            moment: moment,
        });
    });
});

router.post('/ajaxDeleteProduct', function (req, res) {
    var loginStatus = false;
    req.session.admin = 1;
    if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        productId:req.body.productId,
    }
    con.query('DELETE FROM product WHERE product_id=?', sql.productId, function (err, rows) {
        var data = rows;
        if (err) {console.log(err);}
        console.log(data);
        con.query('SELECT * FROM product', function (err, rows) {
            var data = rows;
            if (err) { console.log(err); }
            res.render('backend/ajax_product', {
                loginStatus: loginStatus,
                data: data,
                moment: moment,
            });
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
    var sqlQuery = 'SELECT * FROM product_category;';
    con.query(sqlQuery, function(err,rows){
        if (err) { console.log(err); }
        var data = rows;
        res.render('backend/productadd',{
            loginStatus: loginStatus,      
            message: "",
            data: data,
        });
    })
});

router.post('/product-add1', upload, function (req, res) {
    if (req.session.admin <= 1) {
        loginStatus = false;
    } else if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        pic: req.body.pic,
        addtime: req.body.addtime,
        ident: req.body.ident,
        sort: req.body.sort,
        category: req.body.category,
    };
    var file = req.file;
    // console.log(file);
    console.log('文件類型：' + file.mimetype);
    console.log('文件副檔名：' + path.extname(file.originalname));
    console.log('原始文件名：' + file.originalname);
    console.log('DB儲存文件名稱：' + file.filename);
    console.log('文件保存路径：' + file.path);
    upload(req, res, err => {
        var slqQuery = "INSERT INTO product(product_name,price,stock,description,ident,sort,category,pic,addtime) VALUE(?,?,?,?,?,?,?,?,NOW())";
        con.query(slqQuery, [sql.product_name, sql.price, sql.stock, sql.description, sql.ident, sql.sort, sql.category, file.filename, sql.addtime], function (err, rows) {
            if (err) { console.log(err); }
            var data = rows;
            res.render('backend/toBackProduct', {
                loginStatus: loginStatus,
                message: '產品新增成功',
            });
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