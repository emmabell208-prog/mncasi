import { Request, Response, NextFunction } from 'express';
import { geoLocationService } from '../services/geoLocationService';
import { countryWhitelistService } from '../services/countryWhitelistService';
import { auditLogService } from '../services/auditLogService';
import { getClientIp } from './getClientIp';
export const geoEnforcement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testCountry = (req.headers['x-test-country'] as string) || undefined;
    let countryCode: string;
    if ((process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') && testCountry) {
      countryCode = testCountry.toUpperCase();
    } else {
      const ip = getClientIp(req);
      countryCode = await geoLocationService.getCountryCode(ip);
    }
    const isAllowed = await countryWhitelistService.isCountryAllowed(countryCode);
    if (!isAllowed) {
      await auditLogService.log({
        userId: (req as any).user?.id,
        action: 'COUNTRY_BLOCKED',
        ipAddress: getClientIp(req),
        resolvedCountry: countryCode,
        details: { path: req.path, method: req.method, reason: 'Country not in whitelist' }
      });
      return res.status(403).json({ error: 'ACCESS_DENIED', message: 'Gambling services are not available in your country.', countryCode });
    }
    (req as any).resolvedCountry = countryCode;
    next();
  } catch (error: any) {
    console.error('Geo enforcement error:', error?.message || error);
    await auditLogService.log({
      userId: (req as any).user?.id,
      action: 'GEO_SERVICE_ERROR',
      ipAddress: getClientIp(req),
      details: { error: (error && error.message) || String(error) }
    });
    return res.status(503).json({ error: 'SERVICE_UNAVAILABLE', message: 'Geolocation service temporarily unavailable. Access denied for safety.' });
  }
};
