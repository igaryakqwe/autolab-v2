import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });

  // Create an organization
  const organization = await prisma.organization.create({
    data: {
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      website: faker.internet.url(),
    },
  });

  // Create employees
  await prisma.employee.create({
    data: {
      userId: user1.id,
      organizationId: organization.id,
      role: 'MANAGER',
    },
  });

  await prisma.employee.create({
    data: {
      userId: user2.id,
      organizationId: organization.id,
      role: 'TECHNICIAN',
    },
  });

  // Create services
  const service1 = await prisma.service.create({
    data: {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
      duration: faker.number.int({ min: 15, max: 60 }),
      organizationId: organization.id,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
      duration: faker.number.int({ min: 15, max: 60 }),
      organizationId: organization.id,
    },
  });

  // Create a vehicle
  const vehicle = await prisma.vehicle.create({
    data: {
      type: 'CAR',
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.date.past(10).getFullYear(),
      clientId: user1.id,
    },
  });

  // Create service records
  await prisma.serviceRecord.create({
    data: {
      startTime: new Date(),
      status: 'PENDING',
      organizationId: organization.id,
      employeeId: user2.id,
      clientId: user1.id,
      vehicleId: vehicle.id,
      services: {
        connect: [{ id: service1.id }, { id: service2.id }],
      },
    },
  });

  // Create additional entities
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    await prisma.organization.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        website: faker.internet.url(),
      },
    });

    await prisma.vehicle.create({
      data: {
        type: 'CAR',
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.date.past(10).getFullYear(),
        clientId: user1.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
