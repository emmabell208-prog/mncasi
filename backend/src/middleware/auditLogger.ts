import { Request, Response, NextFunction } from 'express';
export const auditLogger = (req: Request, res: Response, next: NextFunction) => {
  // Minimal audit log - in production push to DB
  console.log('[AUDIT]', req.method, req.path, 'ip=', req.ip);
  next();
};
