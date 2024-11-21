import { MongoClient } from 'mongodb';
import { createClient } from 'redis';

// Use environment variables for sensitive data
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'ieeevisTweets';
const collectionName = 'tweet';

const mongoClient = new MongoClient(uri);
const redisClient = createClient();

// Handle Redis client errors
redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function connectToDatabase() {
  try {
    // Connect to MongoDB and Redis
    await mongoClient.connect();
    await redisClient.connect();

    // Get the database and collection
    const db = mongoClient.db(dbName);
    const tweetCollection = db.collection(collectionName);

    // Return the connected clients and collection
    return { tweetCollection, db, mongoClient, redisClient };
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}

export { connectToDatabase };
