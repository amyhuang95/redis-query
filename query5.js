/**
 * Create a structure that lets you get all the tweets for an specific user.
 * Use lists for each screen_name e.g. a list with key tweets:duto_guerra that
 * points to a list of all the tweet ids for duto_guerra,
 * e.g. [123, 143, 173, 213]. and then a hash that links from tweetid to the
 * tweet information e.g. tweet:123 which points to all the tweet attributes
 * (i.e. user_name, text, created_at, etc)
 */
import { getTweets } from './getTweets.js';
import { connectToRedis } from './redisConnection.js';

const main = async () => {
  const { tweets, mongoClient } = await getTweets();
  const redisClient = await connectToRedis();

  try {
    let tweetCount = 0;
    while (await tweets.hasNext()) {
      const tweet = await tweets.next();
      // Build a list of tweet ids for each screen name
      await redisClient.lPush(`tweets:${tweet.user.screen_name}`, tweet.id_str);
      // Build hashes that link tweet id to the tweet information
      for (const [key, value] of Object.entries(tweet)) {
        await redisClient.hSet(
          `tweet:${tweet.id_str}`,
          key,
          JSON.stringify(value)
        );
      }
      tweetCount++;
    }
    console.log('Number of tweets processed:', tweetCount);
  } catch (e) {
    console.error(e);
  } finally {
    await tweets.close();
    await mongoClient.close();
    await redisClient.quit();
  }
};

main();
