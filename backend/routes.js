const express = require ('express');
const router = express.Router(); 
const User = require('./user');

// API Endpoints
router.post('/auth', (req, res) => {
	var nickname = req.body.nickname;
	var password = req.body.password;
	if (nickname && password) {
		User.findOne({ $and: [{ nickname: nickname, password: password}] }) // fetch by nickname
        .then((result) => {
            if (!result) {
                res.json({
                    authed: false,
                    message: "Invalid username or password",
                });
            } else {
                res.json({
                    authed: true,
                    message: "Login successful"
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
	} else {
		res.json({
            authed: false,
            message: "Please enter username and password!"
        });
	}
});

router.post("/register", (req, res) => {
    User.findOne({
        $or:
            [{ "nickname": req.body.nickname }]
    }).then(user => {
        if (user) {

            return res.status(202).send({
                // message: "This user already exists!",
                // message: req.body.nickname,
                message: "This user already exists!"
            })
        }

        const newUser = new User({
            nickname: req.body.nickname,
            password: req.body.password,
            breakfast: "",
            lunch: "",
            dinner: "",
            breakfastTime: "",
            lunchTime: "",
            dinnerTime: "",
            friendlist: []
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



// fetch by nickname (/fetch/?nickname=blue)
router.get('/fetch/', function (req, res) {
     User.findOne({ $or: [{ nickname: req.query.nickname }] }) 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});
//Fetch By Id, to fetch person dining and time choices 
router.get('/fetchbyid/:id', function (req, res) { 
    User.findById(req.params.id.substring(1))
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

// fetch friends-list using nickname ( /fetchfriends/?nickname=blue)
router.get('/fetchfriends/', function (req, res) {
    User.findOne({ $or: [{ nickname: req.query.nickname }] }) 
       .then((result) => {
           res.send(result.friendlist);
       })
       .catch((err) => {
           res.send(err);
       })
});



// update the choices using id
router.put('/updatechoices/:id', (req, res, next) => {
    User.findOneAndUpdate({id :req.params.id.substring(1)}, {
        $set: {
            breakfast: req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner,
            breakfastTime: req.body.breakfastTime,
            lunchTime: req.body.lunchTime,
            dinnerTime: req.body.dinnerTime,
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


// update the friendlist using id
router.put('/updatefriends/:id', (req, res, next) => {

    User.findOneAndUpdate({id :req.params.id.substring(1)}, {
        $set: {
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