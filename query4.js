/**
 * Create a leaderboard with the top 10 users with more tweets.
 *
 */
import { getTweets } from './getTweets.js';
import { connectToRedis } from './redisConnection.js';

const main = async () => {
  const { tweets, mongoClient } = await getTweets();
  const redisClient = await connectToRedis();

  try {
    // Add each screen_name to a sorted set with ZADD
    while (await tweets.hasNext()) {
      const tweet = await tweets.next();
      await redisClient.zIncrBy('leaderboard', 1, tweet.user.screen_name);
    }

    // Get the top 10 users with the most tweets
    const topUsers = await redisClient.zRangeWithScores('leaderboard', 0, 9, {
      REV: true,
    });
    console.log('Top 10 users with the most tweets:');
    topUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.value}: ${user.score} tweets`);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await tweets.close();
    await mongoClient.close();
    await redisClient.quit();
  }
};

main();
