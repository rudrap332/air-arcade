import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import gameRoutes from './routes/game.routes.js';
import sessionRoutes from './routes/session.routes.js';
import streamingRoutes from './routes/streaming.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import socialRoutes from './routes/social.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import adminRoutes from './routes/admin.routes.js';
import webrtcRoutes from './routes/webrtc.routes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';
import { validateRequest } from './middleware/validation.js';
import { logger } from './utils/logger.js';

// Import services
import { initializeRedis } from './services/redis.service.js';
import { initializeQueue } from './services/queue.service.js';
import { initializeWebRTC } from './services/webrtc.service.js';
import { initializeStreaming } from './services/streaming.service.js';

// Load environment variables
config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize services
const redis = await initializeRedis();
const queue = await initializeQueue();
const webrtc = await initializeWebRTC();
const streaming = await initializeStreaming();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "ws:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100
});

// Apply rate limiting to all routes
app.use('/api/', limiter);
app.use('/api/', speedLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security middleware
app.use(hpp());
app.use(mongoSanitize());
app.use(xssClean());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
const apiVersion = process.env.API_VERSION || 'v1';
const apiPrefix = `/api/${apiVersion}`;

// Public routes
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/games`, gameRoutes);
app.use(`${apiPrefix}/webrtc`, webrtcRoutes);

// Protected routes
app.use(`${apiPrefix}/users`, authMiddleware, userRoutes);
app.use(`${apiPrefix}/sessions`, authMiddleware, sessionRoutes);
app.use(`${apiPrefix}/streaming`, authMiddleware, streamingRoutes);
app.use(`${apiPrefix}/subscriptions`, authMiddleware, subscriptionRoutes);
app.use(`${apiPrefix}/payments`, authMiddleware, paymentRoutes);
app.use(`${apiPrefix}/social`, authMiddleware, socialRoutes);
app.use(`${apiPrefix}/notifications`, authMiddleware, notificationRoutes);

// Admin routes (require admin role)
app.use(`${apiPrefix}/admin`, authMiddleware, adminRoutes);

// Bull Board (Queue monitoring)
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullAdapter(queue.emailQueue),
    new BullAdapter(queue.notificationQueue),
    new BullAdapter(queue.analyticsQueue),
    new BullAdapter(queue.streamingQueue)
  ],
  serverAdapter
});

app.use('/admin/queues', serverAdapter.getRouter());

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  // Join game session
  socket.on('join-session', async (data) => {
    try {
      const { sessionId, userId } = data;
      socket.join(`session-${sessionId}`);
      
      // Update session viewer count
      await prisma.gameSession.update({
        where: { id: sessionId },
        data: { currentViewers: { increment: 1 } }
      });

      socket.emit('session-joined', { sessionId, success: true });
    } catch (error) {
      logger.error('Error joining session:', error);
      socket.emit('session-joined', { success: false, error: 'Failed to join session' });
    }
  });

  // Leave game session
  socket.on('leave-session', async (data) => {
    try {
      const { sessionId, userId } = data;
      socket.leave(`session-${sessionId}`);
      
      // Update session viewer count
      await prisma.gameSession.update({
        where: { id: sessionId },
        data: { currentViewers: { decrement: 1 } }
      });

      socket.emit('session-left', { sessionId, success: true });
    } catch (error) {
      logger.error('Error leaving session:', error);
    }
  });

  // Chat message
  socket.on('chat-message', async (data) => {
    try {
      const { sessionId, userId, message } = data;
      
      // Save message to database
      const chatMessage = await prisma.chatMessage.create({
        data: {
          sessionId,
          userId,
          message,
          messageType: 'TEXT'
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true
            }
          }
        }
      });

      // Broadcast to all users in the session
      io.to(`session-${sessionId}`).emit('chat-message', chatMessage);
    } catch (error) {
      logger.error('Error sending chat message:', error);
      socket.emit('chat-error', { error: 'Failed to send message' });
    }
  });

  // Performance metrics
  socket.on('performance-metrics', async (data) => {
    try {
      const { sessionId, userId, gameId, metrics } = data;
      
      // Save performance metrics
      await prisma.gameStats.create({
        data: {
          userId,
          gameId,
          sessionId,
          fps: metrics.fps,
          latency: metrics.latency,
          packetLoss: metrics.packetLoss,
          bandwidth: metrics.bandwidth,
          cpuUsage: metrics.cpuUsage,
          gpuUsage: metrics.gpuUsage,
          memoryUsage: metrics.memoryUsage,
          streamQuality: metrics.streamQuality,
          resolution: metrics.resolution,
          bitrate: metrics.bitrate
        }
      });

      // Broadcast to session host for monitoring
      socket.to(`session-${sessionId}`).emit('performance-update', {
        userId,
        metrics
      });
    } catch (error) {
      logger.error('Error saving performance metrics:', error);
    }
  });

  // Disconnect handling
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  // Close server
  server.close(() => {
    logger.info('HTTP server closed');
  });

  // Close Prisma connection
  await prisma.$disconnect();
  logger.info('Database connection closed');

  // Close Redis connection
  await redis.quit();
  logger.info('Redis connection closed');

  // Close queue connections
  await queue.close();
  logger.info('Queue connections closed');

  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`🚀 Adda Arcade Backend Server running on port ${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🔗 API Base URL: http://localhost:${PORT}${apiPrefix}`);
  logger.info(`📈 Queue Monitor: http://localhost:${PORT}/admin/queues`);
  logger.info(`💚 Health Check: http://localhost:${PORT}/health`);
});

export default app;
