import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { config } from '../config';
if (!fs.existsSync(config.fileUploadPath)) {
  fs.mkdirSync(config.fileUploadPath, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.fileUploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
    cb(null, `${Date.now()}_${base}${ext}`);
  }
});
export const upload = multer({
  storage,
  limits: { fileSize: config.maxFileSize },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('INVALID_FILE_TYPE'));
    }
    cb(null, true);
  }
});
