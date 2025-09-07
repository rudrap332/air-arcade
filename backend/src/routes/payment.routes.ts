import { Router } from 'express';

const router = Router();

router.post('/intent', async (req, res) => {
  // Placeholder: integrate Stripe SDK here using STRIPE_SECRET_KEY
  // Return a fake clientSecret for now
  return res.json({ success: true, clientSecret: 'test_client_secret' });
});

export default router;
