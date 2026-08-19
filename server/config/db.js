const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  await client.connect();
  db = client.db();
  console.log("MongoDB connected");
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected");
  }

  return db;
}

module.exports = { connectDB, getDB };