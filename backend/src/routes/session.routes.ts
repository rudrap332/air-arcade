import { Router } from 'express';
import { PrismaClient, SessionStatus } from '@prisma/client';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const router = Router();

const createSchema = z.object({
  body: z.object({
    gameId: z.string(),
    title: z.string().optional(),
    maxViewers: z.number().min(1).max(10).default(1),
    resolution: z.string().default('1080p'),
    fps: z.number().default(60),
    enableChat: z.boolean().default(true),
    allowScreenControl: z.boolean().default(false),
    enableSandbox: z.boolean().default(true)
  })
});

router.post('/', validateRequest(createSchema), async (req, res, next) => {
  try {
    const hostId = (req as any).user.id as string;
    const code = uuidv4().split('-')[0].toUpperCase();

    const session = await prisma.gameSession.create({
      data: {
        gameId: req.body.gameId,
        hostId,
        title: req.body.title,
        maxViewers: req.body.maxViewers,
        resolution: req.body.resolution,
        fps: req.body.fps,
        enableChat: req.body.enableChat,
        allowScreenControl: req.body.allowScreenControl,
        enableSandbox: req.body.enableSandbox,
        sessionCode: code,
        status: SessionStatus.WAITING
      }
    });

    res.status(201).json({ success: true, session });
  } catch (e) { next(e); }
});

router.post('/:id/end', async (req, res, next) => {
  try {
    const session = await prisma.gameSession.update({
      where: { id: req.params.id },
      data: { status: SessionStatus.ENDED, endTime: new Date() }
    });
    res.json({ success: true, session });
  } catch (e) { next(e); }
});

export default router;
