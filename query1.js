/**
 * How many tweets are there? Create a tweetCount key that contains the total
 * number of tweets in the database. For this, initialize tweetCount in 0 (SET)
 * , then query the tweets collection in Mongo and increase (INCR) tweetCount.
 * Once the query is done, get the last value of tweetCount (GET) and print it
 * in the console with a message that says "There were ### tweets", with ###
 * being the actual number
 */
import { connectToDatabase } from './dbConnection.js';

const main = async () => {
  const { tweetCollection, client } = await connectToDatabase();

  try {
    // Get query results
    let result = await tweetCollection.countDocuments({
      retweeted_status: { $exists: false },
      in_reply_to_status_id: null,
    });
    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main();
