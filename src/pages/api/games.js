import { connectToDatabase } from "./connect-mongo";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import mime from "mime-types";

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

  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    // region: process.env.AWS_REGION,
  });

  if (req.method === "POST") {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      try {
        if (err) {
          res.status(500).json({ message: "文件上傳出錯", error: err });
          return;
        }

        // 從 files 取得文件資訊
        const uploadedFile = files.image;
        const fileContent = fs.readFileSync(uploadedFile[0].filepath);

        // 取得副檔名
        const ext = path.extname(uploadedFile[0].originalFilename);

        // 文件在 S3 的儲存路徑
        const s3Key = `images/${uploadedFile[0].newFilename + ext}`;

        // 取得文件的 MIME Type
        const contentType = mime.lookup(uploadedFile[0].originalFilename);

        // 上傳到 S3
        const params = {
          Bucket: "scenarios-bucket",
          Key: s3Key,
          Body: fileContent,
          ContentType: contentType,
          ACL: "public-read",
        };
        const s3Upload = await new Upload({
          client: s3,
          params,
        }).done();

        // 取得 S3 URL
        const imageUrl = s3Upload.Location;

        // 準備要儲存到 MongoDB 的資料
        const title = getFieldValue(fields.title);
        const description = getFieldValue(fields.description);
        const content = getFieldValue(fields.content);
        const data = {
          title,
          description,
          content,
          imageUrl, // 使用 S3 圖片的 URL
          createDate: new Date(),
        };

        // 儲存到 MongoDB
        const result = await db.collection("games").insertOne(data);

        res.status(200).json({ message: "文件上傳成功", file: data });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
    });
  } else if (req.method === "GET") {
    try {
      const collection = db.collection('games');
      const data = await collection.find({}, { projection: { content: 0} }).toArray();
      // const data = await db.collection("games").find({}).toArray();
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
