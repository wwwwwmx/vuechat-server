//朋友列表
const express = require('express')
const router = express.Router()
const mongoControl = require('../dbc').mongoControl
var friendList = new mongoControl('vueChat', 'friendList')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
router.post('/get-list', urlencodedParser, (req, res) => {
    console.log(req.body)
    friendList.find({
        myId: req.body.data
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
router.post('/change-list', urlencodedParser, (req, res) => {
    friendList.find({
        userId: req.body.data
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
router.post('/delete-list', urlencodedParser, (req, res) => {
    friendList.remove({
        userId: req.body.data
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
router.post('/search-list', urlencodedParser, (req, res) => {
    friendList.find({
        id: req.body.data
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
router.post('/add-list', urlencodedParser, (req, res) => {
    friendList.insert({

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