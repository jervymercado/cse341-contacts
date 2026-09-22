const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    await mongoose.connect(uri, {
        dbName: 'cse341',
    });
    console.log('Connected to MongoDB');
    return mongoose.connection;
}

module.exports = { connectToDatabase };