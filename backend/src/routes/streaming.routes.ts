import { Router } from 'express';

const router = Router();

router.post('/start', async (req, res) => {
  // Start streaming pipeline placeholder
  res.json({ success: true, message: 'Streaming started' });
});

router.post('/stop', async (req, res) => {
  // Stop streaming pipeline placeholder
  res.json({ success: true, message: 'Streaming stopped' });
});

export default router;
