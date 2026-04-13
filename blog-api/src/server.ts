/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';

/**
 * Types
 */
import type { CorsOptions } from 'cors';

/**
 * Custom modules
 */
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';
import { logger, logtail } from '@/lib/winston';
import limiter from '@/lib/express_rate_limit';
import config from '@/config';
import httpLogger from '@/middlewares/httpLogger';

/**
 * Router
 */
import v1Routes from '@/routes/v1';

/**
 * Express app initialization
 */
const app = express();

/**
 * Trust the first proxy (e.g. Render's load balancer).
 * MUST be set before rate-limiting middleware so that
 * express-rate-limit can correctly read the real client IP
 * from the X-Forwarded-For header instead of throwing
 * ERR_ERL_UNEXPECTED_X_FORWARDED_FOR.
 */
app.set('trust proxy', 1);

/**
 * Enable HTTP request logging in production
 */
if (config.NODE_ENV === 'production') {
  app.use(httpLogger);
}

/**
 * Configure CORS options
 */
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      const errorMessage = `CORS error: ${origin} is not allowed`;
      logger.warn(errorMessage);
      callback(new Error(errorMessage));
    }
  },
  credentials: true,
};

/**
 * Apply CORS middleware
 */
app.use(cors(corsOptions));

/**
 * BODY PARSERS
 * Increase request payload limit to 5MB tests
 */
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

/**
 * Parse cookies
 */
app.use(cookieParser());

/**
 * Enable compression
 */
app.use(
  compression({
    threshold: 1024,
  }),
);

/**
 * Security headers
 */
app.use(helmet());

/**
 * Rate limiting
 * trust proxy (set above) must be configured before this middleware
 * so express-rate-limit can identify clients accurately.
 */
app.use(limiter);

/**
 * API routes (must come before static files)
 */
app.use('/api/v1', v1Routes);

/**
 * Serve frontend in production
 */
if (config.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

/**
 * Start server
 */
(async () => {
  try {
    await connectToDatabase();

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
      logger.info(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

/**
 * Graceful shutdown
 */
const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();
    logger.warn('Server shutdown');
    await logtail.flush();
    process.exit(0);
  } catch (err) {
    logger.error('Error during server shutdown', err);
  }
};

process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);