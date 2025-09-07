import { Router } from 'express';

const router = Router();

router.get('/friends', async (req, res) => {
  res.json({ success: true, friends: [] });
});

export default router;
