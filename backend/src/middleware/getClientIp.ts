import { Request } from 'express';
export function getClientIp(req: Request): string {
  const xff = (req.headers['x-forwarded-for'] as string) || '';
  if (xff) {
    return xff.split(',').map(s => s.trim())[0];
  }
  if (req.ip) return req.ip;
  // @ts-ignore
  return req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown';
}
