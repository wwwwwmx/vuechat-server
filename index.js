const express = require("express")
const app = express()
const mongoControl = require('./dbc').mongoControl
var session = require('express-session')
//初始化数据中的集合
// 引入body-parser模块
const bodyParser = require('body-parser')
// 初始化urlencoded解析器
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})

// 处理静态文件请求 同样可以影响ejs的渲染模板的读取外部js css文件
app.use(express.static('./static', {
  index: false
}))
app.use(bodyParser.json())
//进行错误处理的
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
//将应用程序设置为第一个信任代理。代理是一种服务器,通过使用代理，即使在受Internet防火墙限制的环境下，也可以无限制地启用Internet访问。
app.set('trust proxy', 1)
//配置session
app.use(session({
  //使用块链作为密钥加密cookie
  secret: 'Keyboard cat',
  //每次进行会话检查时是否创建会话
  resave: false,
  //是否保存未初始化的会话
  saveUninitialized: true,
  //如果未指定或者为null，则为浏览器的默认行为（通常是关闭浏览器时删除cookie）。
  /*第一个参数：只有在https才可以访问cookie；第二个参数：设置cookie的过期时间*/
  /*只要页面在操作就不会过期，无操作5秒后过期*/
  cookie: {
    secure: false,
    maxAge: 5000
  },
  rolling: true
}))
//后端进行拦截设置如果未登录全部返回status为0
// app.use('/',(req,res,next)=>{
//    if()
// })
const Aboutuser = require('./router/Aboutuser')
const Aboutfriendlist = require('./router/Aboutfriendlist')
app.use('/aboutuser', Aboutuser)
app.use('/aboutfriendlist', Aboutfriendlist)
app.listen(3001, () => {
  console.log('监听的是')
})