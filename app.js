var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//引入express-session connect-mongo
const session = require('express-session')
const MongoStore = require('connect-mongo')

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/web/account');
var auth = require('./routes/web/auth');
var config = require('./config/config')

//导入account接口路由文件
const accountApiRouter = require('./routes/api/account')
const authApiRouter = require('./routes/api/auth')

var app = express();

let {DBHOST,DBPORT,DBNAME} = config

//设置session中间件
app.use(session({
  name:'sid',//设置cookie的name，默认值是：connect.sid
  secret:'zyt',//参与加密的字符串（又称签名） 加盐
  saveUninitialized:false,//是否为每次请求都设置一个cookie来存储session的id(可以专注于某些的匿名用户)
  resave:true,//是否在每次请求时重新保存session 为20分钟
  store:MongoStore.create({
      mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`//数据库的连接地址
  }),
  cookie:{
      httpOnly:true,//开启后前端无法通过js来访问此cookie
      maxAge:1000*60*60*24*7//此条数据可以控制cookie和session的生命周期
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/', accountRouter);
app.use('/api',accountApiRouter);
app.use('/',auth)
app.use('/api',authApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //响应404
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
