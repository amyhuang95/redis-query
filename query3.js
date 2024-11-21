/**
 * Who is the person that got the most tweets?
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
