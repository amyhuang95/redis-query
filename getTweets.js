import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'ieeevisTweets';
const collectionName = 'tweet';

const mongoClient = new MongoClient(uri);

/**
 * Get all tweets from MongoDB.
 * @returns cursor of all tweets
 */
export async function getTweets() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const tweetCollection = db.collection(collectionName);
    const tweets = tweetCollection.find({});
    return { tweets, mongoClient };
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}
