const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId, // not working with current implementation
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