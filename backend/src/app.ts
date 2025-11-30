import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { auditLogger } from './middleware/auditLogger';
import { geoEnforcement } from './middleware/geoEnforcement';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';
import paymentRoutes from './routes/payments';
import betRoutes from './routes/bets';
import kycRoutes from './routes/kyc';
export const createApp = () => {
  const app = express();
  app.set('trust proxy', true);
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    }
  }));
  app.use(cors({
    origin: config.frontendUrl,
    credentials: true
  }));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(auditLogger);
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/payments', geoEnforcement, paymentRoutes);
  app.use('/api/bets', geoEnforcement, betRoutes);
  app.use('/api/kyc', kycRoutes);
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });
  app.use(errorHandler);
  return app;
};
