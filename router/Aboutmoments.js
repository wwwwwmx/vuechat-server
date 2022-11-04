//朋友圈
const express = require('express')
const router = express.router()
const mongoControl = require('../dbc').mongoControl()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
var friend = new mongoControl('vueChat', 'friend')
router.post('/add-state', urlencodedParser, (req, res) => {
    friend.insert({
        text: req.body.text,
        time: req.body.time,
        links: req.body.links
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
router.get('/get-state', (req, res) => {
    friend.find({}, (err, data) => {
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
router.post('/delete-state', urlencodedParser, (req, res) => {
    friend.find({
        userId: req.body.id
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