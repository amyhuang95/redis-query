# Tweets Redis Queries

This project contains a set of queries to be executed on a Redis database containing tweets from ieeevis2020 building on the MongoDB database. The queries are written in Node.js and use the node-redis driver.

## Queries

- Query1: How many tweets are there?
- Query2: Compute and print the total number of favorites in the dataset.
- Query3: Compute how many distinct users are there in the dataset.
- Query4: Create a leaderboard with the top 10 users with more tweets.
- Query5: Create a structure that lets you get all the tweets for an specific user.

## How to run the queries

0. Make sure you have MongoDB and Redis installed and running.
1. Clone the repository, and navigate to the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Load the database into MongoDB:
   ```bash
   mongoimport --host localhost:27017 --db ieeevisTweets --collection tweet --file ieeevis2020Tweets.dump
   ```
4. Run the queries using the following commands. Replace query number with the query you want to run:
   ```bash
   node query1.js
   ```

---

This project was developed as part of the course CS 5200 Database Management Systems taught by Professor John Alexis Guerra Gomez at Northeastern University (Oakland).
