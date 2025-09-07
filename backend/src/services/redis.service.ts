import { createClient } from 'redis';
import { logger } from '../utils/logger.js';

export const initializeRedis = async () => {
  const url = process.env.REDIS_URL;
  if (!url) {
    logger.warn('REDIS_URL not set. Redis features are disabled.');
    return {
      quit: async () => {},
    } as any;
  }

  const client = createClient({ url });
  client.on('error', (err) => logger.error('Redis Client Error', err));
  await client.connect();
  logger.info('Connected to Redis');
  return client;
};
