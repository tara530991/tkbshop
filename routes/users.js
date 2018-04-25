var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var BodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "tkbshop",
});

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// // used to serialize the user for the session
// passport.serializeUser(function (user, done) {
//   done(null, user.account);
// });

// // used to deserialize the user
// passport.deserializeUser(function (account, done) {
//   connection.query("SELECT * FROM users WHERE account = ? ", [account], function (err, rows) {
//     done(err, rows[0]);
//   });
// });

// passport.use('local-login',
//   new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField: 'account',
//     passwordField: 'password',
//     passReqToCallback: true // allows us to pass back the entire request to the callback
//   },
//     function (req, account, password, done) { // callback with email and password from our form
//       connection.query("SELECT * FROM member WHERE account = ?", [account], function (err, rows) {
//         if (err)
//           return done(err);
//         if (!rows.length) {
//           return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//         }

//         // if the user is found but the password is wrong
//         if (!bcrypt.compareSync(password, rows[0].password))
//           return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

//         // all is well, return successful user
//         return done(null, rows[0]);
//       });
//     })
// );


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
