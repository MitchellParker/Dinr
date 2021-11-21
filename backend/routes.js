const express = require ('express');
const app = express(); 
const router = express.Router(); 
const User = require('./user');

// Middleware
app.use(express.json) 

// API Endpoints
router.post("/register", (req, res) => {
    User.findOne({
        $or:
            [{ "nickname": req.body.nickname }]
    }).then(user => {
        if (user) {

            return res.status(202).send({
                //  message: "This user already exists!",
                message: req.body.nickname,
                message: "This user already exists!"
            })
        }

        const newUser = new User({
            nickname: req.body.nickname,
            password: req.body.password,
            breakfast: req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner,
            breakfastTime: req.body.breakfastTime,
            lunchTime: req.body.lunchTime,
            dinnerTime: req.body.dinnerTime,
            friendlist: req.body.friendlist
        }) //making sure our user input is in the right format

        newUser.save()
            .catch(err => {
                return res.status(500).json({
                    message: "Unidentified error! server might be down",
                    error: err
                })
            });
        res.status(201).json(newUser);
    })
});

router.get('/fetch/', function (req, res) {
    console.log(req);
    User.findOne({ $or: [{ nickname: req.query.nickname }] }) // fetch by nickname
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get("/fetchAll", (req, res) => {
    User.find({}, (err, data) => {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    });
});


router.get('/fetch/:id', function (req, res) { //Fetch By Id
    User.findById(req.params.id.substring(1))
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.put('/update/:id', (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.id.substring(1) }, {
        $set: {
            nickname: req.body.nickname,
            password: req.body.password,
            breakfast: req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner,
            breakfastTime: req.body.breakfastTime,
            lunchTime: req.body.lunchTime,
            dinnerTime: req.body.dinnerTime,
            friendlist: req.body.friendlist
        }
    })
        .then(result => {
            res.status(200).json({
                updated_user: result
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


router.delete('/delete/:id', (req, res, next) => {
    User.remove({ _id: req.params.id.substring(1) })
        .then(result => {
            res.status(200).json({
                message: 'User deleted',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.delete('/deleteByName/:nickname', (req, res, next) => {
    User.remove({ nickname: req.params.nickname.substring(1) })
        .then(result => {
            res.status(200).json({
                message: 'User deleted',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;