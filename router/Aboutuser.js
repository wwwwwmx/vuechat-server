//登录，注册，个人资料
const express = require('express')
const router = express.Router()
const mongoControl = require('../dbc').mongoControl
const md5 = require('md5');
var user = new mongoControl('vueChat', 'user')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})
const salt = "vuechat_V1.0.0"
const changemd5 = (res) => {
  return salt + res
}
router.post('/register', urlencodedParser, (req, res) => {
  let userInfo = req.body
  user.insert([{
    account: userInfo.account,
    password: changemd5(userInfo.password),
    imgUrl: '',
    username: '',
  }], (err, date) => {
    if (err) {
      //进行错误处理
      res.cc(err)
    } else {
      res.send({
        code: 'ok',
        status: 200,
        data: date
      })
    }
  })

})
router.post('/login', urlencodedParser, (req, res) => {
  console.log(req.body, 'login')
  if (req.body.data) {
    user.find({
      account: req.body.data
    }, (err, data) => {
      if (err) {
        res.cc(err)
      } else {
        res.send({
          code: "ok",
          status: 200,
          data: data
        })
      }
    })
  } else {
    console.log(req.body.id, 'body')
    user.findById(
      req.body.id, (err, data) => {
        if (err) {
          res.cc(err)
        } else {
          res.send({
            code: "ok",
            status: 200,
            data: data[0]
          })
        }
      })
  }
})
router.post('/changeSelf', urlencodedParser, (req, res) => {
  user.find({
    account: req.body
  }, (err, data) => {
    if (err) {
      res.cc(err)
    } else {
      res.send({
        code: "ok",
        status: 200,
        data: data
      })
    }
  })
})
module.exports = router