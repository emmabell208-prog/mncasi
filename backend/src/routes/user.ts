import { Router } from 'express';
const router = Router();
router.get('/geo-check', async (req,res)=>{ res.json({ countryCode: 'US', isAllowed: true }); });
router.get('/balance', async (req,res)=>{ res.json({ balance: 100 }); });
export default router;
