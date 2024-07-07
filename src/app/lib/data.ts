import { MongoClient, ObjectId } from 'mongodb';

let cachedDb: any = null;

export async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);
  const db = client.db('scenarios'); // 指定特定 DB

  cachedDb = db;
  return db;
}

export async function getScriptList(type: string) {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI as string);
    const collection = db.collection(type);

    const data = await collection
      .find({}, { projection: { content: 0 } }) // 這裡使用 projection 來排除 content 欄位
      .sort({ createdAt: -1 }) // 這裡使用 -1 表示按 createdAt 降序排序
      .toArray();

    // 將 _id 轉換為字串
    const formattedData = data.map((script: any) => ({
      ...script,
      _id: script._id.toString(),
    }));

    return formattedData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get script list');
  }
}

export async function getScriptById(type: string, id: string) {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI as string);
    const collection = db.collection(type);

    const data = await collection.findOne({ _id: new ObjectId(id) });

    const formattedData = {
      ...data,
      createdAt: data.createdAt.toISOString(), // 假設 createdAt 是日期字段
    };

    return formattedData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get script by id');
  }
}
