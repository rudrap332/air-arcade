import Queue from 'bull';

export const initializeQueue = async () => {
  if (!process.env.REDIS_URL) {
    // No Redis: return no-op queues
    const noop = {
      add: async () => {},
      close: async () => {}
    } as any;
    return {
      emailQueue: noop,
      notificationQueue: noop,
      analyticsQueue: noop,
      streamingQueue: noop,
      close: async () => {}
    };
  }

  const options: Queue.QueueOptions = { redis: process.env.REDIS_URL } as any;

  const emailQueue = new Queue('email', options);
  const notificationQueue = new Queue('notification', options);
  const analyticsQueue = new Queue('analytics', options);
  const streamingQueue = new Queue('streaming', options);

  return {
    emailQueue,
    notificationQueue,
    analyticsQueue,
    streamingQueue,
    close: async () => {
      await emailQueue.close();
      await notificationQueue.close();
      await analyticsQueue.close();
      await streamingQueue.close();
    }
  };
};
