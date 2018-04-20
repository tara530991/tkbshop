var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "admin",
//   password: "admin",
//   database: "tkbshop",
// });

// router.get('/register', function (req, res) {
//   var sql = {
//     username: req.body.username,
//     email: req.body.email,
//     tel: req.body.tel,
//     birth: req.body.birth,
//     address: req.body.address,
//     account: req.body.account,
//     password: req.body.password,
//     password2: req.body.password2,
//     allow: req.body.allow,
//   };
//   console.log(sql);
  // con.query('INSERT INTO member SET ?', sql, function (err, rows) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.setHeader('Content-Type', 'application/json');
  //   res.redirect('/');
  // });
// });

module.exports = router;
