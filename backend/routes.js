const express = require ('express');
const router = express.Router();
const mongo = require('mongodb');
const bodyParser = require('body-parser'); 
const User = require('./user');


const app = express(); 
app.use(bodyParser.json) 
app.use(express.urlencoded({ extended: true})); 
// API Endpoints

router.post("/register", (req, res) => {
   
    User.findOne({
        $or:
            [{"nickname":req.body[0].nickname}]
    }).then(user => {
        if (user) {    
                  
            return res.status(202).send({
              //  message: "This user already exists!",
                message: req.body[0].nickname,
               message: "This user already exists!"
            })
        }

        const newUser = new User({
            nickname: req.body[0].nickname,
            password: req.body[0].password,
            breakfast:req.body[0].breakfast,
            lunch:req.body[0].lunch,
            dinner:req.body[0].dinner,
            friendlist:req.body[0].friendlist
        }) //making sure our user input is in the right format
    
        newUser.save()
            .catch(err => {
                return res.status(500).json({
                    message: "Unidentified error! server might be down",
                    error: err
                })
            });

        res.json(201, newUser);
    })

});

router.get('/fetch/', function(req, res) {
    console.log(req );
    User.findOne({$or: [ {nickname: req.query.nickname } ]}) // fetch by nickname
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err);
    })

});

router.get("/fetch", (req, res) => {
    User.find({}, (err, data) => {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    });
});


router.get('/fetch/:id', function(req, res) { //Fetch By Id
    console.log(req );
    User.findById(req.params.id.substring(1))
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

//router.put('/update', cookieAuth, function(req, res) {







//}) 


router.delete('/delete/:nickname', function(req, res) {

    User.remove({ nickname: req.params.nickname.substring(1) }, function(err) {
        if (!err) {
         
            return res.send('User deleted!');
        } else {
             return res.send('Error deleting user!');
        }
    });

});


module.exports = router;







