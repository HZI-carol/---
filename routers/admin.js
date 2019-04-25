const　express = require('express');
const User = require('../schema/users');
const addCategory = require('../controller/category/add');
const updateCategory = require('../controller/category/update');
const deleteCategory = require('../controller/category/delete');

const addContent = require('../controller/content/add');
const updateContent = require('../controller/content/update');
const deleteContent = require('../controller/content/delete');

const category = require('../controller/category/index');
const content = require('../controller/content/index');
const router = express.Router();


//设置后台管理的权限
router.use((req,res,next)=>{
    if(!req.userInfo.isAdmin){
        res.send('你不是管理员,没有权限访问该页面');
        return;
    }
    next();
})

//渲染后台首页
router.get('/',(req,res)=>{
    res.render('admin/index',{
        userInfo:req.userInfo,
    });
})

//渲染用户管理页面
router.get('/user',(req,res)=>{
    /**
     *  第1页   显示2条  跳过0条
     *  第2页   显示2条  跳过2条
     *  第3页   显示2条  跳过4条
     *  第4页   显示2条  跳过6条
     *  第n页   显示2条  跳过 (页数-1)*2 条
     * */
    let page = +req.query.page||1;   //当前页数
    let limit = 2;  //每页显示的数据数量

    //从数据库中读取所有的用户信息

    User.count().then((count)=>{
        //计算最大的页数
        let pageMax = Math.ceil(count/limit);
        page = Math.min(pageMax,page);
        let skip = (page-1)*limit;  //每页跳过的数据数量
        User.find().limit(limit).skip(skip).then((results)=>{
            res.render('admin/user/index',{
                userInfo:req.userInfo,
                results,
                page,
                pageMax
            });
        })
    })


})


//渲染添加分类的页面
router.get('/category',category.showIndex)

//渲染添加分类的页面
router.get('/category/add',addCategory.showAdd)

//接受要添加分类的数据
router.post('/category/add',addCategory.add);

//渲染修改分类的页面
router.get('/category/update',updateCategory.showUpdate);

//接受要修改分类的数据
router.post('/category/update',updateCategory.update);


//渲染删除分类的页面
router.get('/category/delete',deleteCategory.showDelete);

//接受要删除分类的数据
router.post('/category/delete',deleteCategory.delete);




//渲染添加内容的页面
router.get('/content',content.showIndex)


//渲染添加内容的页面
router.get('/content/add',addContent.showAdd);

//接受要添加的内容的数据
router.post('/content/add',addContent.add);


//渲染修改内容的页面
router.get('/content/update',updateContent.showUpdate);

//接受要修改的内容的数据
router.post('/content/update',updateContent.update);


//渲染删除内容的页面
router.get('/content/delete',deleteContent.showDelete);

//接受要删除的内容的数据
router.post('/content/delete',deleteContent.delete);

module.exports = router;