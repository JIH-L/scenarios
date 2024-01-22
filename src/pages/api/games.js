// pages/api/upload.js
import { connectToDatabase } from "./connect-mongo";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // 關閉 Next.js 的默認解析器
  },
};

function getFieldValue(field) {
  return Array.isArray(field) ? field[0] : field;
}

export default async function handler(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const form = formidable({});
    form.uploadDir = "./public/images"; // 指定文件上傳目錄
    form.keepExtensions = true; // 保留文件擴展名
    form.on("fileBegin", (name, file) => {
      const ext = path.extname(file.originalFilename);
      // 使用 formidable 生成的 newFilename 作为文件名
      file.filepath = path.join(form.uploadDir, file.newFilename + ext);
    });

    form.parse(req, async (err, fields, files) => {
      try {
        if (err) {
          res.status(500).json({ message: "文件上傳出錯", error: err });
          return;
        }

        // 從 files 對象獲取文件信息
        const uploadedFile = files.image;
        // 取得副檔名
        const ext = path.extname(uploadedFile[0].originalFilename);
        // 構造出可訪問的 URL
        const imageUrl = `/images/${uploadedFile[0].newFilename + ext}`;
        const title = getFieldValue(fields.title);
        const content = getFieldValue(fields.content);
        const data = {
          title,
          content,
          imageUrl, // 使用 imageUrl 作為圖片的 URL
        };

        // 根據需要將數據保存到數據庫，進行其他處理
        const result = await db.collection("games").insertOne(data);

        res.status(200).json({ message: "文件上傳成功", file: data });
      } catch (error) {
        // 如果有任何錯誤，發送一個 500 錯誤響應
        res.status(500).json({ message: "服務器錯誤", error: error.message });
      }
    });
  } else if (req.method === "GET") {
    try {
      const data = await db.collection("games").find({}).toArray();
      res.status(200).json({ data });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching games", error: error.message });
    }
  } else {
    res.status(405).json({ message: "不允許的請求方法" });
  }
}
