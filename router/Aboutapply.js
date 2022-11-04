//申请信息
const express = require('express')
const router = express()
const mongoControl = require('../dbc').mongoControl()
var apply = new mongoControl('vueChat', 'apply')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
router.post('/add-friend', urlencodedParser, (req, res) => {
    apply.find({
        userId: req.body.id
    })
    apply.insert({
        nickname: req.body.nickname,
        account: req.body.account,
        avatar: req.body.avatar,
        city: req.body.city,
        signature: req.body.signature,
        sex: req.body.sex
    })
})
module.export = router