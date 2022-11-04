//关于评论
const express = require('express')
const router = express().router()
const mongoControl = require('../dbc').mongoControl()
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
var common = new mongoControl('vueChat', 'common')
router.post('/add-common', urlencodedParser, (req, res) => {
    common.insert({
        common: req.body.text,
        time: req.body.time,
        commoner: req.body.commoner,
        avatar: req.body.avatar,
    }, (err, data) => {
        if (err) {
            res.cc(err)
        } else {
            res.send({
                code: 'ok',
                state: '200',
                data: data
            })
        }
    })
})
router.post('/delete-common', urlencodedParser, (req, res) => {
    common.find({
        id: req.body.id
    }, (err, data) => {
        if (err) {
            res.cc(err)
        } else {
            res.send({
                code: 'ok',
                state: '200',
                data: data
            })
        }
    })
})
module.exports = router