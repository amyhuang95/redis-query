/**
 * Compute and print the total number of favorites in the dataset.
 *
 */
import { getTweets } from './getTweets.js';
import { connectToRedis } from './redisConnection.js';

const main = async () => {
  const { tweets, mongoClient } = await getTweets();
  const redisClient = await connectToRedis();

  try {
    // Initialize favoritesSum
    await redisClient.set('favoritesSum', '0');

    // Increase favoritesSum
    while (await tweets.hasNext()) {
      const tweet = await tweets.next();
      await redisClient.incrBy('favoritesSum', tweet.favorite_count);
    }

    // Get final favoritesSum
    const value = await redisClient.get('favoritesSum');
    console.log('Total number of favorites:', value);
  } catch (e) {
    console.error(e);
  } finally {
    await tweets.close();
    await mongoClient.close();
    await redisClient.quit();
  }
};

main();
