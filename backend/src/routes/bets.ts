import { Router } from 'express';
const router = Router();
router.post('/place', async (req,res)=> {
  const { gameType, betAmount } = req.body;
  // simple stub response
  res.json({ success: true, outcome: 'WON', payout: betAmount * 2 });
});
router.get('/history', async (req,res)=> res.json({ bets: [] }));
export default router;
