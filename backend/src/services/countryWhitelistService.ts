// Minimal in-memory for demo; replace with Prisma backed implementation
const allowed = new Set(['US','GB','CA']);
export class CountryWhitelistService {
  async getAllowedCountries(){ return Array.from(allowed); }
  async isCountryAllowed(code: string){ if(!code) return false; return allowed.has(code.toUpperCase()); }
  async addCountry(iso:string){ allowed.add(iso.toUpperCase()); }
  async removeCountry(iso:string){ allowed.delete(iso.toUpperCase()); }
}
export const countryWhitelistService = new CountryWhitelistService();
