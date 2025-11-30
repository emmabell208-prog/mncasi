import { Router } from 'express';
const router = Router();
router.post('/register', async (req,res)=>{ res.json({ success:true, message:'register stub' }); });
router.post('/login', async (req,res)=>{ res.json({ success:true, token:'demo-token' }); });
export default router;
