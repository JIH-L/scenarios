import { connectToDatabase } from './connect-mongo';

export default async function handler(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  if (req.method === 'GET') {
    try {
      const collection = db.collection('novels');
      const data = await collection
        .find({}, { projection: { content: 0 } }) // 這裡使用 projection 來排除 content 欄位
        .sort({ createDate: -1 }) // 這裡使用 -1 表示按 createdAt 降序排序
        .toArray();
      res.status(200).json({ data });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching novels', error: error.message });
    }
  } else {
    res.status(405).json({ message: '不允許的請求方法' });
  }
}
