import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const games = await prisma.game.findMany({
      where: { isActive: true },
      select: { id: true, title: true, slug: true, coverImage: true, genre: true }
    });
    res.json({ success: true, games });
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const game = await prisma.game.findUnique({ where: { slug: req.params.slug } });
    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    res.json({ success: true, game });
  } catch (e) { next(e); }
});

export default router;
