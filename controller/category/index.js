const Category = require('../../schema/category');

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
    Category.count().then((count)=>{
        //计算最大的页数
        let pageMax = Math.ceil(count/limit);
        page = Math.min(pageMax,page);
        let skip = (page-1)*limit;  //每页跳过的数据数量
        Category.find().limit(limit).skip(skip).sort({_id:-1}).then((results)=>{
            res.render('admin/category/index',{
                userInfo:req.userInfo,
                results,
                page,
                pageMax
            });
        })
    })

}