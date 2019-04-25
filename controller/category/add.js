const Category = require('../../schema/category');

//展示添加分类的页面
exports.showAdd = function (req,res) {
    res.render('admin/category/add',{
        userInfo:req.userInfo,
    });
}

//接受添加分类的数据
exports.add = function (req,res) {
    //获取提交的分类
    let category = req.body.category;

    if(category==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类添加',
                message:'分类名称不能为空'
            }
        })
    }
    //从数据库中查询是否已经存在该分类

    Category.findOne({
        name:category,
    }).then((result)=>{
        if(result){ //如果已经找到该分类
            res.render('admin/error',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'分类首页',
                    option:'分类添加',
                    message:'该分类已存在,不能添加重复分类'
                }
            })
            return;
        }
        new Category({      //保存该分类
            name:category
        }).save().then(()=>{
            res.render('admin/success',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'分类首页',
                    option:'分类添加',
                    message:'已成功添加该分类',
                    href:'返回分类首页'
                },
                url:'/admin/category'
            })
        })

    })
}