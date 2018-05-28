// var express = require('express');
// var router = express.Router();
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "tara530991@gmail.com",
        pass: ""
    }
});

// var mailOptions = function (data) {
    // this.data = data;
    // from: data.name,
    // to: "tara530991@gmail.com",
    // subject: "重要訊息通知",
    // html: "<h1>Google BigQuery 存取異常...</h1><b>原因: 參數設定有問題，需要進行檢查</b>"
// };
// var mailOptions = {
//     from: "tara530991@gmail.com",
//     to: "tara530991@gmail.com",
//     subject: "重要訊息通知",
//     html: "<h1>Google BigQuery 存取異常...</h1><b>原因: 參數設定有問題，需要進行檢查</b>"
// };
// module.exports =  function sendEmail(mailOptions){
//     console.log(mailOptions);
//     transporter.sendMail(mailOptions, function (err, info) {
//     // console.log(mailOptions);
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("訊息已經完成傳送: " + info.response);
//     }
    
//     });
// }

module.exports = transporter;
// module.exports = mailOptions;
