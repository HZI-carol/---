const Content = require('../../schema/content');
const Category = require('../../schema/category');

//展示添加内容的页面
exports.showAdd = function (req,res) {

    //从数据库中获取所有的分类信息
    Category.find().then((results)=>{
        res.render('admin/content/add',{
            userInfo:req.userInfo,
            results,
        });
    })
}


//接受添加内容的数据
exports.add = function (req,res) {
    //从数据库中获取所有的分类信息
    let {category,title,description,content} = req.body;

    if(title==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容添加',
                message:'内容标题不能为空'
            }
        })
        return;
    }

    if(description==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容添加',
                message:'内容简介不能为空'
            }
        })
        return;
    }


    if(content==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容添加',
                message:'内容主体不能为空'
            }
        })
        return;
    }

    //从数据库查询有没有重复标题的
    // 如果标题已经存在 则不添加该标题对应的内容
    // 如果不存在该标题   则添加该标题
    Content.findOne({title}).then((result)=>{
        if(result){     //如果找到了该标题
            res.render('admin/error',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'内容首页',
                    option:'内容添加',
                    message:'该标题已存在,不能添加重复标题'
                }
            })
            return;
        }

        console.log(req.userInfo);
        //保存该标题对应的数据
        new Content({
            title,
            description,
            content,
            category,
            author:req.userInfo.id,    //保存用户的id
        }).save().then(()=>{
            res.render('admin/success',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'内容首页',
                    option:'内容添加',
                    message:'这个文章已成功添加',
                    href:'返回内容列表'
                },
                url:'/admin/content'
            })
        })

    })

}