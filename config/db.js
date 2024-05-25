const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/nimzydotcom';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB database');

    // Return the MongoDB client instance
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
