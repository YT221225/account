var express = require('express');
var router = express.Router();
const shortid  = require('shortid');
const  AccountModel = require('../../models/AccountModel')

//声明中间件检测session
let checkLoginMiddleware = require('../../Middleware/checkLoginMiddleware')

//导入moment
const moment = require('moment');

router.get('/account',checkLoginMiddleware,(req, res) =>{

  //读取集合信息(mongoDB)
  AccountModel.find().sort({tiem: -1}).then(data =>{
    res.render('list',{accounts:data,moment})
  })

});

//添加记录
router.get('/account/create',checkLoginMiddleware,(req, res) =>{
  res.render('create')
});

//添加记录
router.post('/account',checkLoginMiddleware,(req, res) =>{

  //导入数据库(mongoDB)
  AccountModel.create({
    ...req.body,
    //将字符串转成日期格式
    time:moment(req.body.time).toDate()
  }).then(data =>{
    res.render('success',{msg:'添加成功',url:'/account'})
  })

});

//删除记录
router.get('/account/:id',checkLoginMiddleware,(req, res) =>{

  //获取params的id参数
  let id = req.params.id;

  //删除(mongoDB)
  AccountModel.deleteOne({_id:id}).then(data => {
    res.render('success',{msg:'删除成功',url:'/account'})
  })
  
  
});

module.exports = router;
