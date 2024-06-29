import { connectToDatabase } from './connect-mongo';
async function handleGetRequest(req, res, db) {
  try {
    // 從請求中獲取分頁參數，設置默認值
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // 計算跳過的文檔數量
    const skip = (page - 1) * limit;

    // 查詢數據庫並實現分頁
    const data = await db
      .collection('novels')
      .find({}, { projection: { content: 0 } }) // 這裡使用 projection 來排除 content 欄位
      .sort({ createdAt: -1 }) // 這裡使用 -1 表示按 createdAt 降序排序
      .skip(skip)
      .limit(limit)
      .toArray();

    // （可選）獲取總文檔數量
    const totalCount = await db.collection('novels').countDocuments();

    // 返回分頁數據和總數
    res.status(200).json({
      data,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export default async function handler(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const methodHandlers = {
    GET: () => handleGetRequest(req, res, db),
  };

  const handler = methodHandlers[req.method];
  if (handler) {
    await handler();
  } else {
    res.status(405).json({ message: '不允許的請求方法' });
  }
}
