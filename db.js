const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'crud_operations';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db(dbName); // Get the database instance
    console.log('MongoDB connected with Native Driver');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database connection is not established');
  }
  return db;
}

// Export the database connection function
module.exports = { connectToDB, getDb };
