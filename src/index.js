import express from 'express';
import multer, { memoryStorage } from 'multer';
import cors from 'cors';
import { fileTypeFromBuffer } from 'file-type';
import cloudinary from './cloudinary.js';
import { bufferToDataURL, replaceFileExtension } from './utils.js';

const app = express();
app.use(cors());

const upload = multer({
  storage: memoryStorage()
});

app.post('/', upload.single('pdf'), async (req, res) => {
  try {
    const { file } = req;

    if (!file || file.mimetype !== 'application/pdf') {
      return res.status(400).send('A PDF file is required.');
    }

    if (file.size > 1 * 1024 * 1024) {
      return res.status(400).send('File size must be less than 1MB.');
    }

    const { buffer, mimetype } = file;

    const upload = await cloudinary.uploader.upload(
      bufferToDataURL(buffer, mimetype)
    );

    const url = replaceFileExtension(upload.secure_url);

    return res.send({ url });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.post('/buffer', express.raw({ limit: '1mb' }), async (req, res) => {
  try {
    const buffer = req.body;

    if (!buffer) {
      return res.status(400).send('Request body is required.');
    }

    if (!req.is('application/octet-stream')) {
      return res.status(400).send('A buffer is required.');
    }

    const { mime } = await fileTypeFromBuffer(buffer);

    if (mime !== 'application/pdf') {
      return res.status(400).send('Invalid file type.');
    }

    const dataURL = bufferToDataURL(buffer, mime);
    const upload = await cloudinary.uploader.upload(dataURL);
    const url = replaceFileExtension(upload.secure_url);

    return res.send({ url });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
