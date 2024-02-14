import dotenv from 'dotenv';
dotenv.config();
import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();
const files = process.env.prod === 'true' ? '../public/assets/' : '../assets/'

router.get("/pdf/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, files, filename);

 if (fs.existsSync(filePath)) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
} else {
  res.status(404).send('Arquivo não encontrado');
}
});

export default router;