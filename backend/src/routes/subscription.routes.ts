import { Router } from 'express';
import { PrismaClient, SubscriptionStatus } from '@prisma/client';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/plans', async (req, res, next) => {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    res.json({ success: true, plans });
  } catch (e) { next(e); }
});

const attachSchema = z.object({
  body: z.object({ planId: z.string() })
});

router.post('/attach', validateRequest(attachSchema), async (req, res, next) => {
  try {
    const userId = (req as any).user.id as string;
    const { planId } = req.body;

    const plan = await prisma.subscriptionPlan.findUnique({ where: { id: planId } });
    if (!plan || !plan.isActive) return res.status(400).json({ success: false, message: 'Invalid plan' });

    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: { planId, status: SubscriptionStatus.ACTIVE, startDate: new Date(), endDate: null },
      create: { userId, planId, status: SubscriptionStatus.ACTIVE }
    });

    res.json({ success: true, subscription });
  } catch (e) { next(e); }
});

export default router;
