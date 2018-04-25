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

//前端



module.exports = router;
