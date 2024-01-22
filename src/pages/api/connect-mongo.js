import { MongoClient } from 'mongodb';

let cachedDb = null;

export async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);
  const db = client.db('scenarios'); // 指定特定 DB

  cachedDb = db;
  return db;
}