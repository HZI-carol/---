const　express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();


//使用body-parser 中间件解析post数据
app.use(bodyParser.urlencoded({
    extended:false,
}))

//cookie-parser 中间件解析cookie数据
app.use(cookieParser())
//设置模板引擎为ejs
app.set('view engine','ejs');
/**
 *  根据不同的模块  划分不同的路由
 *
 * **/

app.use((req,res,next)=>{
    if(req.cookies.userInfo){    //如果该用户已经登陆了
        req.userInfo= JSON.parse(req.cookies.userInfo);
    }
    next();

})
//处理后台的服务
app.use('/admin',require('./routers/admin'));

//处理注册登录的服务
app.use('/api',require('./routers/api'));

//处理前台的服务
app.use('/',require('./routers/main'));

//为public目录下的所有文件自动设置路由
app.use(express.static('public'));

//链接数据库
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true},(err)=>{
    if(err){
        console.log('数据库链接失败~~');
        return;
    }
    console.log('数据库链接成功~~');

    app.listen(5000)
})