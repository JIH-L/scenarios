import { connectToDatabase } from "./connect-mongo";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const data = await db
        .collection("games")
        .findOne({ _id: new ObjectId(id) });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "不允許的請求方法" });
  }
}
