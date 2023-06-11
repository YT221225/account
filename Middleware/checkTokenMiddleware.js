//导入token
const jwt = require('jsonwebtoken')

//导入配置
const {secret} = require('../config/config')

module.exports = (req,res,next) => {

    
    //获取token
    let token = req.get('token')
  
    //判断
    if(!token){
      return res.json({
        code:"2003",
        msg:"token缺失",
        data:null
      })
    }
    jwt.verify(token,`${secret}`,(err,data) => {
      //检测token是否正确
      if(err){
        return res.json({
          code:"2003",
          msg:"校验失败",
          data:null
        })
      }
      //保存用户的信息
      req.user = data

      //校验成功
      next()
    })
  }