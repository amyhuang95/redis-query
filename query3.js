/**
 * Compute how many distinct users are there in the dataset. For this use a
 * set by the screen_name, e.g. screen_names
 */
import { connectToDatabase } from './dbConnection.js';

const pipeline = [
  // Sort tweets by user names
  {
    $sortByCount: '$user.name',
  },
  // Get the first record
  {
    $limit: 1,
  },
];

const main = async () => {
  const { tweetCollection, client } = await connectToDatabase();

  try {
    let result = await tweetCollection.aggregate(pipeline).next();
    console.log(result._id, 'got the most tweets with', result.count, 'tweets');
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main();
