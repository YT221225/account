//以函数的方式暴露,设置成功和失败的回调(类似于pormise)
module.exports = function(success,error){
if(typeof error !== 'function'){
    error = () => {
        console.log('连接失败~~')
    }
}
//安装mongoose
//导入mongoose
const mongoose = require('mongoose')

const {DBHOST,DBPORT,DBNAME} = require('../config/config')

//设置strictQuery 为 true
mongoose.set('strictQuery',true)

//链接mongodb服务
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
//设置连接成功的回调
mongoose.connection.once('open',() =>{

    success()
});

//设置连接失败的回调
mongoose.connection.on('error',() =>{

    error()
});

//设置连接关闭的回调
mongoose.connection.once('close',() =>{
    console.log('连接关闭')
});
}