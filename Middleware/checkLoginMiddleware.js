//暴露检测登录session的中间件
module.exports = (req,res,next) =>{
  
    //检测session
    if(!req.session.username){
      return res.redirect('/login')
    }
    next();

}