import { connectToDatabase } from './connect-mongo';
import { ObjectId } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';
import mime from 'mime-types';

export const config = {
  api: {
    bodyParser: false, // 關閉 Next.js 的默認解析器
  },
};

function getFieldValue(field) {
  return Array.isArray(field) ? field[0] : field;
}

async function handlePostRequest(req, res, db, s3) {
  const form = formidable({});
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        res.status(500).json({ message: '文件上傳出錯', error: err });
        return;
      }

      const uploadedFile = files.image;
      const fileContent = fs.readFileSync(uploadedFile[0].filepath);
      const ext = path.extname(uploadedFile[0].originalFilename);
      const s3Key = `images/${uploadedFile[0].newFilename + ext}`;
      const contentType = mime.lookup(uploadedFile[0].originalFilename);

      const params = {
        Bucket: 'scenarios-bucket',
        Key: s3Key,
        Body: fileContent,
        ContentType: contentType,
        ACL: 'public-read',
      };
      const s3Upload = await new Upload({
        client: s3,
        params,
      }).done();

      const imageUrl = s3Upload.Location;

      const data = {
        title: getFieldValue(fields.title),
        description: getFieldValue(fields.description),
        content: getFieldValue(fields.content),
        type: getFieldValue(fields.type),
        imageUrl,
        createdAt: new Date(),
      };

      await db.collection('novels').insertOne(data);

      res.status(200).json({ message: '文件上傳成功', file: data });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
}

async function handleGetRequest(req, res, db) {
  try {
    const { id } = req.query;
    const data = await db
      .collection('novels')
      .findOne({ _id: new ObjectId(id) });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default async function handler(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const methodHandlers = {
    POST: () => handlePostRequest(req, res, db, s3),
    GET: () => handleGetRequest(req, res, db),
  };

  const handler = methodHandlers[req.method];
  if (handler) {
    await handler();
  } else {
    res.status(405).json({ message: '不允許的請求方法' });
  }
}
