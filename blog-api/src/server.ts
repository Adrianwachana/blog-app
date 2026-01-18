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
 * Express app initial
 */
const app = express();

// Enable HTTP request logging in production
if (config.NODE_ENV === 'production') {
  app.use(httpLogger);
}

// Configure CORS options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false,
      );
      logger.warn(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Enable JSON request body parsing
app.use(express.json());

// Enable URL-encoded request body parsing with extended mode
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Enable response compression to reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, // Only compress responses larger than 1KB
  }),
);

// Use Helmet to enhance security by setting various HTTP headers
app.use(helmet());

// Apply rate limiting middleware to prevent excessive requests and enhance security
app.use(limiter);

/**
 * IMPORTANT: API routes MUST come BEFORE static file serving
 * This ensures /api/v1/* routes work correctly
 */
app.use('/api/v1', v1Routes);

/**
 * Serve static files and handle client-side routing (PRODUCTION ONLY)
 * This should come AFTER all API routes
 */
if (config.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  
  // Serve static files from the React build folder
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  // Catch-all route: serve index.html for any route not handled above
  // This enables client-side routing (React Router, etc.)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

/**
 * Immediately Invoked Async Function Expression (IIFE) to start the server.
 */
(async () => {
  try {
    await connectToDatabase();

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
      logger.info(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error(`Failed to start the server`, err);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

/**
 * Handles server shutdown gracefully by disconnecting from the database.
 */
const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();
    logger.warn('Server SHUTDOWN');
    await logtail.flush();
    process.exit(0);
  } catch (err) {
    logger.error('Error during server shutdown', err);
  }
};

process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);