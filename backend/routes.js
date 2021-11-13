const express = require ('express');
const Supporter = require("./user");
const mongo = require('mongodb');
const router = express.Router();

router.post("/register", (req, res) => {})

router.get('/fetchAll', function(req, res) {})

router.get('/fetch/:nickname', function(req, res) { })

router.get('/fetch/', function(req, res) {})

router.put('/update', cookieAuth, function(req, res) {})

router.delete("/delete/:", function (req, res) {})




module.exports = router;