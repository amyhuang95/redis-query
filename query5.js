/**
 * Write the instructions that will separate the Users information into a different collection
 */
import { connectToDatabase } from './dbConnection.js';

const userCollPipeline = [
  // Get unique user objects
  {
    $group: {
      _id: '$user.id_str', // Group by the user_id field
      uniqueUser: {
        $first: '$user', // Selects the first document for each user_id
      },
    },
  },
  // Promote user object to main document
  {
    $replaceRoot: {
      newRoot: '$uniqueUser',
    },
  },
  // Rename id to _id
  {
    $set: {
      _id: '$id_str',
    },
  },
  // Exclude original id field
  {
    $project: {
      id: 0,
      id_str: 0,
    },
  },
  // Create new collection named user
  {
    $out: 'User',
  },
];

const tweetsOnlyCollPipeline = [
  // Add user_id field from user object
  {
    $set: {
      user_id: '$user.id_str',
      'retweeted_status.user_id': '$retweeted_status.user.id_str',
    },
  },
  // Exclude user sub-documents
  {
    $project: {
      user: 0,
      'retweeted_status.user': 0,
    },
  },
  // remove retweeted status if it's empty
  {
    $addFields: {
      retweeted_status: {
        $cond: {
          if: { $eq: ['$retweeted_status', {}] },
          then: '$$REMOVE',
          else: '$retweeted_status',
        },
      },
    },
  },
  // Create new collection named Tweets_Only
  {
    $out: 'Tweets_Only',
  },
];

const main = async () => {
  const { tweetCollection, client, db } = await connectToDatabase();

  try {
    // Create a user collection that contains all the unique users
    await tweetCollection.aggregate(userCollPipeline).toArray();

    // Get the newly created user collection
    let userDocs = db.collection('User').find({}).limit(5);
    console.log('First 5 docs in User collection: ');
    for await (let doc of userDocs) {
      console.log(doc);
    }

    // Create a new Tweets_Only collection with reference to user id
    await tweetCollection.aggregate(tweetsOnlyCollPipeline).toArray();
    let tweetDocs = db.collection('Tweets_Only').find({}).limit(5);
    console.log('First 5 docs in Tweets_Only collection:');
    for await (let doc of tweetDocs) {
      console.log(doc);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main();
