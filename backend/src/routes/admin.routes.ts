import { Router } from 'express';

const router = Router();

router.get('/stats', async (req, res) => {
  res.json({ success: true, stats: { users: 0, sessions: 0 } });
});

export default router;
