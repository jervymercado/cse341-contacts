const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    if (db) return db;
    await client.connect();
    db = client.db('cse341');
    console.log('Connected to MongoDB');
    return db;
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized — call connectToDatabase() first.');
    }
    return db;
}

module.exports = { connectToDatabase, getDb };