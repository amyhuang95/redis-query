/**
 * How many tweets are there?
 *
 */
import { connectToDatabase } from './dbConnection.js';

const main = async () => {
  const { tweetCollection, mongoClient, redisClient } =
    await connectToDatabase();

  try {
    // Initialize tweetCount to 0
    await redisClient.set('tweetCount', '0');

    // Query the tweets collection in Mongo
    let tweetsCursor = tweetCollection.find({
      retweeted_status: { $exists: false },
      in_reply_to_status_id: null,
    });

    // Increase tweetCount
    while (await tweetsCursor.hasNext()) {
      await tweetsCursor.next();
      await redisClient.incr('tweetCount');
    }

    // Get final tweetCount
    const value = await redisClient.get('tweetCount');
    console.log('There were', value, 'tweets.');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoClient.close();
    await redisClient.quit();
  }
};

main();
