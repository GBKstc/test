//生成一个WEB应用
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
//对应用进行访问口 输出内容 进行设置
var router = express.Router();

router.use(function (req,res,next) {
    console.log('There is a requesting.');
    next();
})
router.use(function (req,res,next) {
    var myTime = new Date();
    console.log(myTime);
    next();
})
router.get('/',function (req,res) {
    res.send('<h1>Hello '+req.query.name+'</h1>');
    console.log(req.query);
})
router.get('/:name',function (req,res) {

    res.send('<h1>Hello '+req.query.name+' ！</h1>')
})

router.post('/',function (req,res) {
    var name = req.body.name;
    //var user = req.query.name;
    //console.log(user);
    //res.send('<h1>Hello '+user+' ！</h1>');
    res.json({message:'Hello '+name});
})
app.use('/home',router);

//确定访问端口
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens on port'+port);
