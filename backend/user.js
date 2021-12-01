const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Define information that each user stores in database
const UserSchema = new Schema({
    nickname: String,  
    password: String,
    breakfast: String,
    lunch: String,
    dinner: String,
    breakfastTime: String,
    lunchTime: String,
    dinnerTime: String,
    friendlist: Array
},  {
    versionKey: false
})

module.exports = mongoose.model('user', UserSchema);