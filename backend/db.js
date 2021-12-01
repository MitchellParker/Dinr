require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.DB_URI;

// connect to database using its URI
const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    console.log("MongoDB Successfully Connected!")
}

module.exports = connectDB;


