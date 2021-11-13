const express = require ('express');
const router = express.Router();
const User = require('./user');

// API Endpoints
router.get("/users", (req, res) => {
    User.find({}, (err, data) => {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    });
});

router.post("/users", (req, res) => {
    const user = req.body;

    User.create(user, (err, data) => {
        if (!err) {
            res.status(201).send(data);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    })
})

router.post("/register", (req, res) => {})

router.get('/fetchAll', function(req, res) {})

router.get('/fetch/:nickname', function(req, res) { })

router.get('/fetch/', function(req, res) {})

//router.put('/update', cookieAuth, function(req, res) {})

router.delete("/delete/:", function (req, res) {})

module.exports = router;