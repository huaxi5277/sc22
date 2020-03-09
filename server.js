const express = require('express')   // express 
const bodyParser = require('body-parser')   // 解析 post 请求
const mongoose = require('mongoose');    // 操作数据库 
const passport = require('passport');    // 验证登录的   检测  账号和密码 
const app = express()
const path = require('path')
// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  

// 使用静态文件 
app.use('/static',express.static(path.resolve('./', 'public', 'img')))


// 引入外部路由 

const users = require('./router/users')
const public = require('./router/public')
const posts = require('./router/posts')


// 连接数据库
const mongodbUrl = 'mongodb://127.0.0.1:27017/keepApp'
mongoose.set('useFindAndModify', false)
mongoose
.connect(mongodbUrl, { useNewUrlParser: true,useUnifiedTopology: true  })
.then(() => console.log('MongoDB Connected server ... '))
.catch(err => console.log(err));

// 初始化 passpart 
app.use(passport.initialize());
require('./config/possport')(passport);
// 使用中间件实现允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    next();
  });

  // 使用外部路由 
  app.use('/keep/users',users);
  app.use('/keep/public',public)
  app.use('/keep/posts',posts)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});