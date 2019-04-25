const Category = require('../../schema/category');

//展示修改分类的页面
exports.showUpdate = function (req,res) {
    //  获取分类的名字
    let category = req.query.category;
    res.render('admin/category/update',{
        userInfo:req.userInfo,
        category,
    });
}


//接受修改分类的数据
exports.update = function (req,res) {
    //当前的分类
    let cate = req.query.category;

    //表单提交的分类
    let category = req.body.category;

    //如果分类为空  则提示分类不能为空
    if(category==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类修改',
                message:'分类名称不能为空'
            }
        })
        return;
    }
    //从数据库  查询  当前分类是否存在
    // 如果已经存在  则不能更改
    // 如果不存在  则把当前分类改成知道分类
    Category.updateOne({name:cate},{$set:{name:category}}).then((result)=>{
        if(!result.nModified){  //如果改变的数量为0
            res.render('admin/error',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'分类首页',
                    option:'分类修改',
                    message:'分类已存在,不可以重复修改'
                }
            })
            return;
        }
        res.render('admin/success',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类修改',
                message:'修改分类成功',
                href:'返回分类首页'
            },
            url:'/admin/category'
        })
    })
}

