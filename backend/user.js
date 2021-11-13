const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const SupporterSchema = new Schema({
    nickname: String, //need some unique identifier to check for account duplicates   
    password: String,  //
    breakfast: String,
    lunch: String,
    dinner: String,
    friendlist: Array
    
})

module.exports = mongoose.model('supporter', SupporterSchema);
