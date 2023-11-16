var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');// [后台管理系统]用户相关接口
const NewsRouter = require('./routes/admin/NewsRouter');// [后台管理系统]新闻相关接口
const ProductRouter = require('./routes/admin/ProductRouter');// [后台管理系统]产品相关接口
const JobRouter = require('./routes/admin/JobRouter');// [后台管理系统]职位相关接口

const webNewsRouter = require('./routes/web/NewsRouter');// [企业门户网站]新闻相关接口
const webProductRouter = require('./routes/web/ProductRouter');// [企业门户网站]产品相关接口
const webJobsRouter = require('./routes/web/JobsRouter');// [企业门户网站]岗位相关接口
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(webNewsRouter)// 4.[官网]新闻相关接口 
app.use(webProductRouter)// 5.[官网]产品相关接口 
app.use(webJobsRouter) //6.[官网]岗位相关接口 


/*
 /adminapi/* - 后台系统用的(需要中间件进行登录校验)
 /webapi/* - 企业官网用的(不需要登录校验)
*/

// 设置中间件验证token(在所有的中间件之前,不放行后续接口无法响应)
/*
  token有效,中间件放行next(),token无效则不放行[返回401状态]
*/
app.use((req,res,next)=>{
  // 如果token有效 ,next() 
  // 如果token过期了, 返回401错误
  /*
    首先排除登录接口(因为登录接口没有token)
  */
  if(req.url==="/adminapi/user/login"){
    next()
    return;
  }

  const token = req.headers["authorization"].split(" ")[1]
  // token解析
  if(token){
    var payload = JWT.verify(token)
    // console.log(payload)
    if(payload){
      // 每一次请求,重新生成新的token
      const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
      },"7d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
})

app.use(UserRouter)// 1.用户相关接口  
app.use(NewsRouter)// 2.[后台]新闻相关接口
app.use(ProductRouter)// 3.产品相关接口 
app.use(JobRouter) //4.职位相关接口

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
