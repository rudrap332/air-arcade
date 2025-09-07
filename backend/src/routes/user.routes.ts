import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';

const prisma = new PrismaClient();
const router = Router();

const updateSchema = z.object({
  body: z.object({
    displayName: z.string().min(2).max(50).optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(200).optional()
  })
});

router.put('/me', validateRequest(updateSchema), async (req, res, next) => {
  try {
    const { displayName, avatar, bio } = req.body;
    const userId = (req as any).user.id as string;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { displayName, avatar, bio },
      select: { id: true, email: true, username: true, displayName: true, avatar: true, bio: true }
    });

    res.json({ success: true, user });
  } catch (e) {
    next(e);
  }
});

export default router;
