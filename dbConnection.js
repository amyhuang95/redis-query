import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'ieeevisTweets';
const collectionName = 'tweet';

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const tweetCollection = db.collection(collectionName);
    return { tweetCollection, client, db };
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}

export { connectToDatabase };
