import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error('Request error', { status, message, stack: err.stack });

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
};
