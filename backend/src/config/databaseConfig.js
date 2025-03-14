const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection established')
    } catch (error) {
        console.error('Error connecting to database', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;