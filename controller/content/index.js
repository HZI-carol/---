const Content = require('../../schema/content');

exports.showIndex = function (req,res) {
    //从数据库中读取所有分类的信息

    /**  sort(_id:-1)   按照_id  降序排列
     *   limit(n)       限制读取的数量
     *   skip(n)        限制跳过的数量
     *  第1页   显示2条  跳过0条
     *  第2页   显示2条  跳过2条
     *  第3页   显示2条  跳过4条
     *  第4页   显示2条  跳过6条
     *  第n页   显示2条  跳过 (页数-1)*2 条
     * */
    let page = +req.query.page||1;   //当前页数
    let limit = 2;  //每页显示的数据数量

    //从数据库中读取所有的用户信息
    Content.count().then((count)=>{
        //计算最大的页数
        let pageMax = Math.ceil(count/limit);
        page = Math.min(pageMax,page);
        let skip = (page-1)*limit;  //每页跳过的数据数量
        Content.find().limit(limit).skip(skip).sort({_id:-1}).populate(['category','author']).then((results)=>{

            res.render('admin/content/index',{
                userInfo:req.userInfo,
                results,
                page,
                pageMax
            });
        })
    })
}

/*
*   Model.populate('字段')
*   1.在本集合中查找指定字段
*   2.按照指定字段的ref代表的集合中
*   3.进行跨集合查询
*
* */