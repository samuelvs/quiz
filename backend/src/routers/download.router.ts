import express, { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

router.get("/pdf/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../assets/', filename);

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