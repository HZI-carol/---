const　express = require('express');
const Category = require('../schema/category');
const Content = require('../schema/content');

const router = express.Router();

let data = {};

//处理通用的数据
router.use((req,res,next)=>{
    data.userInfo = req.userInfo;
    Category.find().then((categorys)=>{
        data.categorys = categorys;
        next();
    });
})

//渲染首页
router.get('/',(req,res)=>{

    data.limit = 3;
    data.page = +req.query.page||1;
    data.category = req.query.category;

    let where = {};
    //如果点击css  或者是js等分类  则where这个对象就存着对象的分类信息
    //如果没有点击css  即/  则where即使{}
    if(req.query.category){
        where.category = req.query.category;
    }

    Content.find(where).count().then((count)=>{
        data.count = count;
        data.pageMax = Math.ceil(data.count/data.limit);
        data.page = Math.min(data.pageMax, data.page);
        data.skip = (data.page-1)*data.limit;  //每页跳过的数据数量
        return Content.find(where).limit(data.limit).skip(data.skip).sort({_id:-1}).populate('category');
    }).then((contents)=>{
        data.contents = contents;
        res.render('main/index',data);
    });

})


//  阅读全文的后台处理
router.get('/view',(req,res)=>{
    //获取当前文章的id
    let contentId = req.query.contentId;
    Content.findById({_id:contentId}).populate(['author','category']).then((content)=>{
        //阅读量加1
        content.views++;
        //保存
        content.save();
        data.content = content;
        res.render('main/view',data)
    })
})

//评论提交的后台处理
router.post('/comment',(req,res)=>{

    if(!req.userInfo){
        data.code = 1;
        data.message = '你还没有登录,请先登录';
        res.send(data);
        return;
    }

   let {contentId,comment} = req.body;


   //定义评论的格式
   let commentData = {
       comment,
       time:new Date,
       username:req.userInfo.username
   }
    Content.findById(contentId).then((result)=>{
        //添加新的评论
        result.comment.push(commentData);
        //保存这篇文章
        result.save().then(()=>{
            res.send(result.comment)
        });
    })


})


router.get('/comment',(req,res)=>{

    let contentId = req.query.contentId;
    Content.findById(contentId).then((result)=>{
        res.send(result.comment)

    })
})



module.exports = router;