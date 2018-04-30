var mysql = require('mysql');

module.exports = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "tkbshop",
  });  

//sql不是路由，所以不能用module.export的方式去串（路由中放入路由）
//可以把creatConnection看成一個物件，去導入

// con.end();
// exports = 'product';