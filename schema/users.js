const mongoose = require('mongoose');

//定义用户的数据格式
const userSchema = new mongoose.Schema({
    //用户名
    username:String,
    //用户的密码
    password:String,
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

//暴露用户的模型
module.exports = mongoose.model('users',userSchema);

