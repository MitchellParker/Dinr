const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

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