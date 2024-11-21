# Tweets MongoDB Queries

This project contains a set of queries to be executed on a MongoDB database containing tweets from ieeevis2020. The queries are written in Node.js and use the MongoDB Node.js driver.

## Queries

- Query1: How many tweets are not retweets or replies? (hint the field retweeted_status contains an object when the tweet is a retweeet)
- Query2: Return the top 10 screen_names by their number of followers.
- Query3: Who is the person that got the most tweets?
- Query4: Who are the top 10 people that got more retweets in average, after tweeting more than 3 times
- Query5: Write the instructions that will separate the Users information into a different collection

## How to run the queries

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
