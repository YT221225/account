var express = require('express');
var router = express.Router();

//导入用户的模型
const UserMdodel = require('../../models/UserModel')
const md5 = require('md5')
const {secret} = require('../../config/config')

//导入token
const jwt = require('jsonwebtoken')

//登录操作
router.post('/login',(req,res) => {
    //获取用户和密码
    let {username,password} = req.body 
    //查询数据库
    UserMdodel.findOne({username,password:md5(password)}).then(data => {
        if(!data){
            return res.json({
                code:'2002',
                msg:'用户名或密码错误',
                data:null
            })  
        }
        //创建token
        let token = jwt.sign({
            username:data.username
        },`${secret}`,{
            expiresIn:60 * 60 * 24 * 7
        })
        //响应token
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })
        
    })
 
})

//退出登录
router.post('/logout',(req,res) => {
    req.session.destroy(() => {
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})


module.exports = router;