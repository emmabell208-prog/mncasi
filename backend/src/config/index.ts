import { z } from 'zod';
const configSchema = z.object({
  port: z.number().default(3001),
  frontendUrl: z.string().default('http://localhost:3000'),
  databaseUrl: z.string().optional(),
  jwtSecret: z.string().min(32).optional(),
  jwtRefreshSecret: z.string().min(32).optional(),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  maxmindAccountId: z.string().optional(),
  maxmindLicenseKey: z.string().optional(),
  maxmindDbPath: z.string().default('./geo/GeoLite2-Country.mmdb'),
  playMoneyMode: z.boolean().default(true),
  minAge: z.number().default(18),
  fileUploadPath: z.string().default('./uploads'),
  maxFileSize: z.number().default(5 * 1024 * 1024)
});
export const config = configSchema.parse({
  port: parseInt(process.env.PORT || '3001'),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  nodeEnv: (process.env.NODE_ENV as any) || 'development',
  maxmindAccountId: process.env.MAXMIND_ACCOUNT_ID,
  maxmindLicenseKey: process.env.MAXMIND_LICENSE_KEY,
  maxmindDbPath: process.env.MAXMIND_DB_PATH,
  playMoneyMode: process.env.PLAY_MONEY_MODE !== 'false',
  minAge: parseInt(process.env.MIN_AGE || '18'),
  fileUploadPath: process.env.FILE_UPLOAD_PATH || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880')
});
