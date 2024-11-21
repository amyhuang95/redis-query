/**
 * Who are the top 10 people that got more retweets on average,
 */
import { connectToDatabase } from './dbConnection.js';

const pipeline = [
  // Group by user name, get the number of tweets and the average retweets
  {
    $group: {
      _id: '$user.name',
      tweets: {
        $count: {},
      },
      avg_retweets: {
        $avg: '$retweet_count',
      },
    },
  },
  // Filter users with more than 3 tweets
  {
    $match: {
      tweets: {
        $gt: 3,
      },
    },
  },
  // Sort by average retweets
  {
    $sort: {
      avg_retweets: -1,
    },
  },
  // Show top 10 records
  {
    $limit: 10,
  },
];

const main = async () => {
  const { tweetCollection, client } = await connectToDatabase();

  try {
    let result = tweetCollection.aggregate(pipeline);
    console.log(
      'Top 10 people that got more retweets on average after tweeting more than 3 times:'
    );
    for await (const doc of result) {
      console.log(doc._id, 'got', doc.avg_retweets, 'retweets on average.');
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main();
