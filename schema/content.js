const mongoose = require('mongoose');

//定义内容的数据格式
const contentSchema = new mongoose.Schema({
    //内容的标题
    title:String,
    //内容的简介
    description:String,
    //内容的主体
    content:String,
    //内容的分类  关联字段
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorys'
    },
    //发表时间
    time:{
        type:Date,
        default:new Date,
    },
    //阅读量
    views:{
        type:Number,
        default:0,
    },
    //作者
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    //评论
    comment:{
        type:Array,
        default:[]
    }
})

//暴露分类的模型
module.exports = mongoose.model('contents',contentSchema);
