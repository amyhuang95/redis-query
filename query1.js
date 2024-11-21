/**
 * How many tweets are not retweets or replies?
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
