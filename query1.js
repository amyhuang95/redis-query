/**
 * How many tweets are there?
 *
 */
import { getTweets } from './getTweets.js';
import { connectToRedis } from './redisConnection.js';

const main = async () => {
  const { tweets, mongoClient } = await getTweets();
  const redisClient = await connectToRedis();

  try {
    // Initialize tweetCount to 0
    await redisClient.set('tweetCount', '0');

    // Increase tweetCount
    while (await tweets.hasNext()) {
      await tweets.next();
      await redisClient.incr('tweetCount');
    }

    // Get final tweetCount
    const value = await redisClient.get('tweetCount');
    console.log('There were', value, 'tweets.');
  } catch (e) {
    console.error(e);
  } finally {
    await tweets.close();
    await mongoClient.close();
    await redisClient.quit();
  }
};

main();
