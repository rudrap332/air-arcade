import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';
import { createRealtimeSession } from '../services/openai.service.js';

const router = Router();

const requestSchema = z.object({
  body: z.object({
    model: z.string().optional(),
    voice: z.string().optional(),
    modalities: z.array(z.string()).optional()
  })
});

router.post('/openai/ephemeral', validateRequest(requestSchema), async (req, res, next) => {
  try {
    const session = await createRealtimeSession(req.body);
    // Returns a short-lived client_secret
    res.json({ success: true, session });
  } catch (e) {
    next(e);
  }
});

export default router;
