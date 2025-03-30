import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const ORGANIZATION_ID = 'bf16dd6b-27de-412e-8557-ec109f689e87';

const serviceTitles = [
  'Oil Change',
  'Tire Rotation',
  'Brake Service',
  'Air Filter Replacement',
  'Battery Check',
  'Transmission Service',
  'Wheel Alignment',
  'AC Service',
  'Engine Tune-up',
  'Spark Plug Replacement',
  'Fuel System Service',
  'Coolant Flush',
  'Power Steering Service',
  'Suspension Service',
  'Exhaust System Service'
];

async function seedServices() {
  try {
    // Create 15 services with random data
    for (const title of serviceTitles) {
      await prisma.service.create({
        data: {
          title,
          description: faker.lorem.paragraph(),
          price: faker.number.float({ min: 50, max: 500, precision: 0.01 }),
          duration: faker.number.int({ min: 30, max: 240 }), // Duration in minutes
          organizationId: ORGANIZATION_ID,
        },
      });
    }

    console.log('Services seeded successfully');
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedServices();
