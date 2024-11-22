/**
 * Compute how many distinct users are there in the dataset. For this use a
 * set by the screen_name, e.g. screen_names
 */
import { getTweets } from './getTweets.js';
import { connectToRedis } from './redisConnection.js';

const main = async () => {
  const { tweets, mongoClient } = await getTweets();
  const redisClient = await connectToRedis();

  try {
    // Add each screen_name to a set
    while (await tweets.hasNext()) {
      const tweet = await tweets.next();
      await redisClient.sAdd('screen_names', tweet.user.screen_name);
    }

    // Get final screen_names
    const value = await redisClient.sCard('screen_names');
    console.log('Total number of distinct users:', value);
  } catch (e) {
    console.error(e);
  } finally {
    await tweets.close();
    await mongoClient.close();
    await redisClient.quit();
  }
};

main();
