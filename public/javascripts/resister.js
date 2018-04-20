var send = document.getElementById('send');
var name = document.getElementById('username');

send.addEventListener("click",function(){
    var sql = {
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
        birth: req.body.birth,
        address: req.body.address,
        account: req.body.account,
        password: req.body.password,
        password2: req.body.password2,
        allow: req.body.allow,
    };
    console.log(sql);

})