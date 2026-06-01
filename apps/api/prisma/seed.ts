import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const localDatabaseUrl =
  'postgresql://evivi:evivi_dev_password@localhost:5432/evivi?schema=public';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? localDatabaseUrl,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const host = await prisma.user.upsert({
    where: { email: 'host@evivi.local' },
    update: {},
    create: {
      email: 'host@evivi.local',
      firstName: 'Nomsa',
      lastName: 'Mokoena',
      role: 'CUSTOMER',
    },
  });

  const vendorOwner = await prisma.user.upsert({
    where: { email: 'vendor@evivi.local' },
    update: {},
    create: {
      email: 'vendor@evivi.local',
      firstName: 'Aisha',
      lastName: 'Naidoo',
      role: 'VENDOR',
    },
  });

  await prisma.vendorProfile.upsert({
    where: { ownerId: vendorOwner.id },
    update: {},
    create: {
      ownerId: vendorOwner.id,
      displayName: 'Innerchild Events Vendor Demo',
      businessReg: 'DEMO-REG-001',
    },
  });

  const event = await prisma.event.upsert({
    where: { id: 'demo-centurion-birthday' },
    update: {},
    create: {
      id: 'demo-centurion-birthday',
      title: 'Nomsa birthday dinner',
      description: 'Demo event for frontend integration and payment flow testing.',
      status: 'LIVE',
      city: 'Centurion',
      province: 'Gauteng',
      startsAt: new Date('2026-08-15T17:00:00.000Z'),
      hostId: host.id,
    },
  });

  await prisma.giftContribution.upsert({
    where: { id: 'demo-centurion-birthday-gift-1' },
    update: {},
    create: {
      id: 'demo-centurion-birthday-gift-1',
      eventId: event.id,
      contributorId: host.id,
      label: 'Dinner contribution',
      message: 'A seeded gift contribution for frontend API work.',
      amountCents: 75000,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
