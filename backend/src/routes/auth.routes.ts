import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';
import { optionalAuth, authMiddleware } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

function signTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  });
  return { accessToken, refreshToken };
}

router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
    if (existing) return res.status(409).json({ success: false, message: 'User already exists' });

    const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS || '12'));

    const user = await prisma.user.create({
      data: { email, username, password: hash, isEmailVerified: false },
      select: { id: true, email: true, username: true }
    });

    const { accessToken, refreshToken } = signTokens(user.id);

    res.status(201).json({ success: true, user, accessToken, refreshToken });
  } catch (e) {
    next(e);
  }
});

router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const { accessToken, refreshToken } = signTokens(user.id);

    res.json({ success: true, user: { id: user.id, email: user.email, username: user.username }, accessToken, refreshToken });
  } catch (e) {
    next(e);
  }
});

router.post('/refresh', async (req, res) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ success: false, message: 'Refresh token required' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
    const { accessToken, refreshToken } = signTokens(decoded.userId);
    res.json({ success: true, accessToken, refreshToken });
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, email: true, username: true }
  });
  res.json({ success: true, user });
});

export default router;

