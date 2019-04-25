const Content = require('../../schema/content');

//展示删除内容的页面
exports.showDelete = function (req,res) {
    let id = req.query.id;
    Content.findById(id).populate('category').then((result)=>{
        res.render('admin/content/delete',{
            userInfo:req.userInfo,
            result,
        });
    })
}

//接受修改内容的数据
exports.delete = function (req,res) {
    let id = req.query.id;
    let title = req.body.title;

    console.log(title);
    if(title==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容删除',
                message:'内容标题不能为空'
            }
        })
        return;
    }

    //按照指定标题查找文章
    Content.deleteOne({title}).then((result)=>{
        if(!result.deletedCount){   //如果文章不存在
            res.render('admin/error',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'内容首页',
                    option:'内容删除',
                    message:'该文章不存在,无法删除'
                }
            })
            return;
        }

        res.render('admin/success',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容删除',
                message:'该文章已经成功删除',
                href:'返回内容首页'
            },
            url:'/admin/content'
        })
    })

}