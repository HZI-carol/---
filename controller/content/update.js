const Content = require('../../schema/content');

//展示修改内容的页面
exports.showUpdate = function (req,res) {
    let id = req.query.id;

    //从数据库中查询指定id的文章
    Content.findById(id).populate('category').then((result)=>{
        res.render('admin/content/update',{
            userInfo:req.userInfo,
            //category,
            result,
        });
    })
}


//接受修改内容的数据
exports.update = function (req,res) {
    //获取当前内容的id
    let id = req.query.id;

    let {title,description,content} = req.body;
    if(title==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容修改',
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
                option:'内容修改',
                message:'内容描述不能为空'
            }
        })
        return;
    }


    if(content==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容修改',
                message:'内容主体不能为空'
            }
        })
        return;
    }

    //查询数据库  按照id查找文章  修改对应的字段
    Content.updateOne({_id:id},{$set:{title,description,content,time:new Date}}).then((result)=>{
        res.render('admin/success',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容修改',
                message:'内容更改成功',
                href:'返回内容首页'
            },
            url:'/admin/content'
        })
    })

}

