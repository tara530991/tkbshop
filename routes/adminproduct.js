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

function statusTransform(statusNum) {
    // console.log("狀態" + statusNum);
    switch (statusNum) {
        case '01': status = "訂單處理（待收款）"; break;
        case '02': status = "訂單處理（已收款）"; break;
        case '03': status = "物流運送"; break;
        case '04': status = "訂單完成"; break;
        case '11': status = "退貨申請"; break;
        case '12': status = "退貨申請（物流取貨）"; break;
        case '13': status = "退貨申請（貨物退還）"; break;
        case '14': status = "退貨申請（退款完成）"; break;
        case '99': status = "訂單取消"; break;
    }
    // console.log("狀態" + status);
    return status;
}
function receiptTransform(receiptNum) {
    // console.log("狀態" + statusNum);
    var receipt = '';
    switch (receiptNum) {
        case '2': receipt = "二聯式"; break;
        case '3': receipt = "三聯式"; break;
    }
    // console.log("狀態" + status);
    return receipt;
}

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
            res.render('backend/toProduct', {
                loginStatus: loginStatus,
                message: '產品新增成功',
            });
        });
    });
});

//-------------------訂單---------------------
router.get('/order-list', function (req, res) {
    req.session.admin = 1;
    if (req.session.admin <= 1){
        loginStatus = false;
    }else if(req.session.admin > 1) {
        loginStatus = true;
    }
    var sqlQuery = 'SELECT OD.*, M.username FROM order_detail OD LEFT JOIN member M on OD.MEMBER_EMAIL=M.email ' +
        'ORDER BY addtime,order_id ';
    con.query(sqlQuery, function (err, rows) {
        var data = rows;
        // console.log(data);
        if (err) { console.log(err); }
        var statusArray = new Array();
        for (var i = 0; i < data.length; i++) {
            statusArray.push(statusTransform(data[i].status));
        }
        // console.log(statusArray);
        res.render('backend/orderlist', {
            loginStatus: loginStatus,
            username: req.session.username,
            data: data,
            statusArray: statusArray,
            moment: moment,
            message: '',
        });
    })
});

router.get('/ajaxOrderList', function (req, res) {
    req.session.admin = 1;
    if (req.session.admin <= 1) {
        loginStatus = false;
    } else if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        sort: req.query.sort,
        search: req.query.search,
        // nowPage: res.query.nowPage,
        // pages: res.query.pages,
        // count: res.query.count,
        status: req.query.status,
        orderSearch: req.query.orderSearch,
    }
    console.log(sql);
    var sqlQuery = 'SELECT OD.*, M.username FROM order_detail OD LEFT JOIN member M ' + 
        'on OD.MEMBER_EMAIL=M.email WHERE 1=1 AND Cstatus=1 ';
    if (sql.status !== ''){
        console.log(1);        
        sqlQuery += 'AND status="' + sql.status + '" ';
    } 
    if (sql.search !== ''){
        console.log(2);
        sqlQuery += 'AND buyer LIKE "%' + sql.search + '%" ';
    } 
    if (sql.orderSearch !== '') {
        console.log(2);
        sqlQuery += 'AND order_id="' + sql.orderSearch + '" ';
    } 
    if (sql.sort !== '') {
        console.log(4);
        switch (sql.sort){
            case '1': sqlQuery += 'ORDER BY addtime DESC';　break;
            case '2': sqlQuery += 'ORDER BY addtime ASC';　break;
            case '3': sqlQuery += 'ORDER BY total DESC';　break;
            case '4': sqlQuery += 'ORDER BY total ASC';　break;
        }
    }
    console.log(sqlQuery);
    con.query(sqlQuery, function (err, rows) {
        var data = rows;
        // console.log(data);
        if (err) { console.log(err); }
        var statusArray = new Array();
        for (var i = 0; i < data.length; i++) {
            statusArray.push(statusTransform(data[i].status));
        }
        // console.log(statusArray);
        res.render('backend/ajax_order', {
            loginStatus: loginStatus,
            username: req.session.username,
            data: data,
            statusArray: statusArray,
            moment: moment,
            sort: sql.sort,
            search:sql.search,
            status:sql.status,
            message: '',
        });
    })
});

router.get('/orderContent', function (req, res) {
    req.session.admin = 1;
    if (req.session.admin <= 1) {
        loginStatus = false;
    } else if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        orderID: req.query.orderId,
    }
    var sqlQuery = 'SELECT OD.*, M.username FROM order_detail OD LEFT JOIN member M on OD.MEMBER_EMAIL=M.email ' +
        'WHERE order_id=? ';
    con.query(sqlQuery, sql.orderID, function (err, rows) {
        var data = rows;
        // console.log(data);
        if (err) { console.log(err); }
        var statusArray = new Array();
        for (var i = 0; i < data.length; i++) {
            statusArray.push(statusTransform(data[i].status));
        }
        // console.log(statusArray);
        var sqlQuery = 'SELECT OP.product_id, OP.amount, P.product_name, P.pic, P.price,' +
            ' SUM(OP.amount * P.price) AS subtotal FROM order_product OP LEFT JOIN product P' +
            ' ON OP.product_id = P.product_id WHERE order_id=?' +
            ' GROUP BY OP.product_id, OP.amount;';
        con.query(sqlQuery2, sql.orderID, function (err, rows) {
            var data2 = rows;
            // console.log(data);
            if (err) { console.log(err); }
            var sqlQuery3 = 'SELECT OPAY.bankcode, OPAY.backaccount, OPAY.addtime AS moneyadd FROM order_detail OD ' +
                'LEFT JOIN order_payment OPAY on OD.order_id=OPAY.order_id WHERE order_id=?;';
            con.query(sqlQuery2, sql.orderID, function (err, rows) {
                var data3 = rows;
                // console.log(data);
                if (err) { console.log(err); }
                res.render('backend/ordercontent', {
                    loginStatus: loginStatus,
                    username: req.session.username,
                    data: data,
                    data2: data2,
                    data3: data3,
                    statusArray: statusArray,
                    moment: moment,
                    message: '',
                });
            });
        });
    });
});

router.get('/orderModify', function (req, res) {
    req.session.admin = 1;
    if (req.session.admin <= 1) {
        loginStatus = false;
    } else if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        orderId: req.query.orderId,
    }
    console.log(sql);
    console.log("test");
    var sqlQuery = 'SELECT OD.*, M.username FROM order_detail OD LEFT JOIN member M on OD.MEMBER_EMAIL=M.email ' +
        'WHERE order_id=? ';
    con.query(sqlQuery, sql.orderId, function (err, rows) {        
        var data = rows;
        // console.log(data);
        if (err) { console.log(err); }
        var statusArray = new Array();
        var receiptArray = new Array();
        for (var i = 0; i < data.length; i++) {
            statusArray.push(statusTransform(data[i].status));
        } 
        for (var l = 0; l < data.length; l++) {
            receiptArray.push(receiptTransform(data[l].receipt));
        }
        // console.log(statusArray);
        var sqlQuery2 = 'SELECT OP.product_id, OP.amount, P.product_name, P.pic, P.price,' +
            ' SUM(OP.amount * P.price) AS subtotal FROM order_product OP LEFT JOIN product P' +
            ' ON OP.product_id = P.product_id WHERE order_id=?' +
            ' GROUP BY OP.product_id, OP.amount;';
        con.query(sqlQuery2, sql.orderId, function (err, rows) {
            var data2 = rows;
            // console.log(data);
            if (err) { console.log(err); }
            var sqlQuery3 = 'SELECT OPAY.bankcode, OPAY.bankaccount, OPAY.addtime AS moneyadd FROM order_detail OD ' + 
                'LEFT JOIN order_payment OPAY on OD.order_id=OPAY.order_id WHERE OD.order_id=?;';
            con.query(sqlQuery3, sql.orderId, function (err, rows) {
                console.log("test");
                var data3 = rows;
                // console.log(data);
                if (err) { console.log(err); }
                res.render('backend/ordermodify', {
                    loginStatus: loginStatus,
                    username: req.session.username,
                    data: data,
                    data2: data2,
                    data3: data3,
                    statusArray: statusArray,
                    receiptArray: receiptArray,
                    moment: moment,
                    message: '',
                });
            });
        });
    });
});

router.post('/orderModify1', function (req, res) {
    req.session.admin = 1;
    if (req.session.admin <= 1) {
        loginStatus = false;
    } else if (req.session.admin > 1) {
        loginStatus = true;
    }
    var sql = {
        orderId: req.body.orderId,
        buyer: req.body.buyer,
        address: req.body.address,
        total: req.body.total,
        receipt: req.body.receipt,
        invoiceTitle: req.body.invoiceTitle,
        invoiceNumber: req.body.invoiceNumber,
        status: req.body.status,
        bankcode: req.body.bankcode,
        backaccount: req.body.backaccount,
        moneyadd: req.body.moneyadd,
    }
    var sql2 = {
        deleteId: req.body.deleteId,
        productId: req.body.productId,
        productAmount: req.body.productAmount,
    }
    console.log(sql);
    console.log(sql2);
    var sqlQuery = 'SELECT OD.*, M.username FROM order_detail OD LEFT JOIN member M on OD.MEMBER_EMAIL=M.email ' +
        'WHERE order_id=? ';
    // con.query(sqlQuery, sql.orderId, function (err, rows) {        
    //     var data = rows;
    //     // console.log(data);
    //     if (err) { console.log(err); }
    //     var statusArray = new Array();
    //     for (var i = 0; i < data.length; i++) {
    //         statusArray.push(statusTransform(data[i].status));
    //     }
    //     // console.log(statusArray);
    //     var sqlQuery2 = 'SELECT OP.product_id, OP.amount, P.product_name, P.pic, P.price,' +
    //         ' SUM(OP.amount * P.price) AS subtotal FROM order_product OP LEFT JOIN product P' +
    //         ' ON OP.product_id = P.product_id WHERE order_id=?' +
    //         ' GROUP BY OP.product_id, OP.amount;';
    //     con.query(sqlQuery2, sql.orderId, function (err, rows) {
    //         var data2 = rows;
    //         // console.log(data);
    //         if (err) { console.log(err); }
    //         var sqlQuery3 = 'SELECT OPAY.bankcode, OPAY.bankaccount, OPAY.addtime AS moneyadd FROM order_detail OD ' + 
    //             'LEFT JOIN order_payment OPAY on OD.order_id=OPAY.order_id WHERE OD.order_id=?;';
    //         con.query(sqlQuery3, sql.orderId, function (err, rows) {
    //             var data3 = rows;
    //             // console.log(data);
    //             if (err) { console.log(err); }
                res.render('backend/orderlist', {
                    loginStatus: loginStatus,
                    username: req.session.username,
                    data: data,
                    data2: data2,
                    data3: data3,
                    statusArray: statusArray,
                    moment: moment,
                    message: '',
                });
    //         });
        // });
    // });
})

module.exports = router;