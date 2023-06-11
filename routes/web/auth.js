var express = require('express');
var router = express.Router();

//导入用户的模型
const UserMdodel = require('../../models/UserModel')
const md5 = require('md5')

//注册
router.get('/reg',(req,res) => {
    //响应html内容
    res.render('auth/reg')
})

//注册用户
router.post('/reg',(req,res) => {
    //做表单验证
    if(req.body.username == "" || req.body.username == null || req.body.password == "" || req.body.password == null){
        return res.render('success',{msg:'账号和密码不能为空',url:'/reg'})
    }
    UserMdodel.find().then(data => {
        for (const key in data) {
            if(req.body.username ==  data[key].username){
                return res.render('success',{msg:'该账号已存在，换一个试试呢',url:'/reg'})
            }else{
                //获取请求体数据并创建用户
                UserMdodel.create({...req.body,password:md5(req.body.password)}).then(data => {
                     res.render('success',{msg:'注册成功',url:'/login'})
                })
            } 
        }  
    })


})

//登录
router.get('/login',(req,res) => {
    //响应html内容
    res.render('auth/login')
})
//登录操作
router.post('/login',(req,res) => {
    //获取用户和密码
    let {username,password} = req.body 
    //查询数据库
    UserMdodel.findOne({username,password:md5(password)}).then(data => {
        if(!data){ 
            if(req.body.username == "" || req.body.username == null || req.body.password == "" || req.body.password == null){
                res.render('success',{msg:'请输入你的账号或者密码',url:'/account'})
            }
            return res.render('success',{msg:'你所输入的密码有误',url:'/account'})
        }
        //写入session
        req.session.username = data.username
        req.session.id = data._id
        res.render('success',{msg:'登录成功',url:'/account'})
    })
 
})

//退出登录
router.post('/logout',(req,res) => {
    req.session.destroy(() => {
        res.render('auth/login')
    })
})


module.exports = router;