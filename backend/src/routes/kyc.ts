import { Router } from 'express';
import { upload } from '../middleware/upload';
const router = Router();
router.post('/upload', upload.fields([{ name: 'id_front' }, { name: 'id_back' }, { name: 'selfie' }]), (req,res)=> {
  res.json({ success: true, files: Object.keys(req.files || {}) });
});
export default router;
