//信息
const express = require('express')
const router = express.Router()
const mongoControl = require('../dbc').mongoControl()
var message = new mongoControl('vueChat', 'message')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
router.post('/friend-message', urlencodedParser, (req, res) => {
    message.find({
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
router.get('/get-message', (req, res) => {
    message.find({}, (err, data) => {
        if (err) {
            res.cc(err)
        } else {
            res.send({
                code: 'ok',
                status: 200,
                data: data
            })
        }
    })
})
router.post('/delete-message', (req, res) => {
    message.remove({
        userId: req.body.id
    }, (err, data) => {
        if (err) {
            res.cc(err)
        } else {
            res.send({
                code: 'ok',
                status: 200,
                data: data
            })
        }
    })
})
module.exports = router