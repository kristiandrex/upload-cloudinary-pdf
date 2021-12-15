const { config } = require('dotenv');
config();

const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinary');
const { fileToDataURI, changeExtToPng } = require('./utils');

const app = express();

const upload = multer({
  storage: multer.memoryStorage()
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

    const upload = await cloudinary.uploader.upload(fileToDataURI(file));

    return res.send(changeExtToPng(upload.secure_url));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
