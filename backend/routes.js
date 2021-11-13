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

router.post("/register", (req, res) => {}) // create account

router.get('/fetch/:nickname', function(req, res) { }) // add friends

//router.put('/update', cookieAuth, function(req, res) {}) // update account

router.delete("/delete/:", function (req, res) {}) // delete account

module.exports = router;