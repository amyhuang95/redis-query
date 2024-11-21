/**
 * Return the top 10 screen_names by their number of followers.
 */
import { connectToDatabase } from './dbConnection.js';

const pipeline = [
  // Sort tweets by created_at
  {
    $sort: {
      created_at: -1,
    },
  },
  // Group by user screen name, get latest followers count
  {
    $group: {
      _id: '$user.screen_name',
      last_followers_count: {
        $last: '$user.followers_count',
      },
    },
  },
  // Sort by last followers count
  {
    $sort: {
      last_followers_count: -1,
    },
  },
  // Show top 10 records
  {
    $limit: 10,
  },
  // rename columns
  {
    $project: {
      screen_name: '$_id',
      last_followers_count: 1,
      _id: 0,
    },
  },
];

const main = async () => {
  const { tweetCollection, client } = await connectToDatabase();

  try {
    // Get query results
    let result = tweetCollection.aggregate(pipeline);
    console.log('Top 10 screen_names by their number of followers:');
    for await (const doc of result) {
      console.log(doc.screen_name, doc.last_followers_count);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main();
