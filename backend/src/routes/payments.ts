import { Router } from 'express';
import { paymentService } from '../services/paymentService';
const router = Router();
router.post('/deposit', async (req,res)=> {
  try{
    const { amount } = req.body;
    const userId = 'user_demo';
    const country = 'US';
    const r = await paymentService.processDeposit(Number(amount||0),'USD', userId, country);
    res.json(r);
  } catch(err:any){ res.status(400).json({ error: err.message }); }
});
export default router;
