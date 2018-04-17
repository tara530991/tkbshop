var express = require('express');
var app = express();

app.listen(3000,function(req,res){
    console.log('')
});
app.get('/', function(req,res){
    res.sendfile('./views/index.html');
});
app.get('/order', function(req,res){
    res.sendfile('/view/order.html');
});

app.post()