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
            [{"nickname":req.body.nickname}]
    }).then(user => {
        if (user) {    
                  
            return res.status(202).send({
              //  message: "This user already exists!",
                message: req.body.nickname,
               message: "This user already exists!"
            })
        }

        const newUser = new User({
<<<<<<< HEAD
            nickname: req.body[0].nickname,
            password: req.body[0].password,
            breakfast: req.body[0].breakfast,
            lunch: req.body[0].lunch,
            dinner: req.body[0].dinner,
            breakfastTime: req.body[0].breakfastTime,
            lunchTime: req.body[0].lunchTime,
            dinnerTime: req.body[0].dinnerTime,
            friendlist:req.body[0].friendlist
=======
            nickname: req.body.nickname,
            password: req.body.password,
            breakfast:req.body.breakfast,
            lunch:req.body.lunch,
            dinner:req.body.dinner,
            friendlist:req.body.friendlist
>>>>>>> 1080c379207cdedcb976dd263b21dd648204aac0
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

router.put('/update/:id', (req, res, next) => {
console.log(req.params.id);
User.findOneAndUpdate({_id:req.params.id.substring(1)},{
$set:{
            nickname: req.body[0].nickname,
            password: req.body[0].password,
            breakfast: req.body[0].breakfast,
            lunch: req.body[0].lunch,
            dinner: req.body[0].dinner,
            breakfastTime: req.body[0].breakfastTime,
            lunchTime: req.body[0].lunchTime,
            dinnerTime: req.body[0].dinnerTime,
            friendlist:req.body[0].friendlist
}
})
.then (result=>{
    res.status(200).json({
        updated_user:result
    })

})
.catch(err=>{
    console.log(err);
    res.status(500).json({
    error:err
    })
})
}) ;


router.delete('/delete/:id', (req,res,next)=> {
    User.remove({_id:req.params.id.substring(1)})
    .then(result=>{
    res.status(200).json({
    message: 'User deleted',
    result:result
        })
     })
     .catch(err=>{
         res.status(500).json({
             error:err
         })
     })
    });

    router.delete('/deleteByName/:nickname', (req,res,next)=> {
        User.remove({nickname:req.params.nickname.substring(1)})
        .then(result=>{
        res.status(200).json({
        message: 'User deleted',
        result:result
            })
         })
         .catch(err=>{
             res.status(500).json({
                 error:err
             })
         })
        });


module.exports = router;







