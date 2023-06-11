var express = require('express');
var router = express.Router();
const shortid  = require('shortid');
const  AccountModel = require('../../models/AccountModel')

//导入moment
const moment = require('moment');

//生成中间件
let checkTokenMiddleware = require('../../Middleware/checkTokenMiddleware')

//获取列表
router.get('/account',checkTokenMiddleware,(req, res) =>{
  //校验token
  
    //读取集合信息(mongoDB)
    AccountModel.find().sort({tiem: -1}).then(data =>{
       res.json({
          //响应编号 一般是20000 和 0000
          code:'0000',
          //响应的信息
          msg:'读取成功',
          //响应的数据
          data:data
      })
    })
  

});

//添加记录
router.post('/account',checkTokenMiddleware,(req, res) =>{

  //导入数据库(mongoDB)
  AccountModel.create({
    ...req.body,
    //将字符串转成日期格式
    time:moment(req.body.time).toDate()
  }).then(data =>{
    res.json({
      code:'0000',
      //响应的信息
      msg:'创建成功',
      //响应的数据
      data:data
    })
  })

});

//删除记录
router.delete('/account/:id',checkTokenMiddleware,(req, res) =>{

  //获取params的id参数
  let id = req.params.id;

  //删除(mongoDB)
  AccountModel.deleteOne({_id:id}).then(data => {
    res.json({
      code:'0000',
      //响应的信息
      msg:'删除成功',
      //响应的数据
      data:{}
    })
  })
  
});

//获取单个账单信息
router.get('/account/:id',checkTokenMiddleware,(req,res) => {
  //获取params的id参数
  let id = req.params.id;
  //查询数据库
  AccountModel.findById(id).then(data =>{
    res.json({
      code:'0000',
      //响应的信息
      msg:'查询成功',
      //响应的数据
      data:data
    })
  })
  })

//更新单个账单信息
router.patch('/account/:id',checkTokenMiddleware,(req,res) => {
  let {id} = req.params

  //更新数据库
  AccountModel.updateOne({_id:id},req.body,).then(data => {
    
    //再次查询数据库，不然则是统计的数据
    AccountModel.findById(id).then(data => {
      res.json({
        code:'0000',
        //响应的信息
        msg:'更新成功',
        //响应的数据
        data:data
      })
    })

  })
})



module.exports = router;
