const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nickname: String, //need some unique identifier to check for account duplicates   
    password: String,  //
    breakfast: String,
    lunch: String,
    dinner: String,
    friendlist: Array
},  {
    versionKey: false
})

module.exports = mongoose.model('user', UserSchema);
