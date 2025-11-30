import { config } from '../config';
export interface GeoLocationProvider { getCountryCode(ip: string): Promise<string>; }
export class MockGeoLocationService implements GeoLocationProvider {
  private mock = new Map<string,string>();
  setMockCountry(ip: string, code: string){ this.mock.set(ip, code); }
  async getCountryCode(ip: string){ return this.mock.get(ip) || 'US'; }
}
export const geoLocationService = new MockGeoLocationService();
// Note: replace with MaxMind implementation in production and call initialize()
