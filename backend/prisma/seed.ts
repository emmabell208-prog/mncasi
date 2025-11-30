import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const pwHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'admin123', 10);
  let admin = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        passwordHash: pwHash,
        firstName: 'Admin',
        lastName: 'User',
        dateOfBirth: new Date('1990-01-01'),
        isAdmin: true,
        kycStatus: 'APPROVED',
        balance: 0
      }
    });
    console.log('Admin user created.');
  } else {
    console.log('Admin already exists.');
  }
  const sample = ['US','GB','CA'];
  for (const iso of sample) {
    const exists = await prisma.countryWhitelist.findUnique({ where: { isoCode: iso } });
    if (!exists) {
      await prisma.countryWhitelist.create({ data: { isoCode: iso, countryName: iso, addedBy: admin.id } });
      console.log('Seeded country', iso);
    }
  }
}
main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>process.exit());
