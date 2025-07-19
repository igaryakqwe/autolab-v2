import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.findFirst();
  if (!organization) {
    console.error('No organization found. Please seed organizations first.');
    return;
  }

  const numberOfClients = 10; // adjust as needed

  for (let i = 0; i < numberOfClients; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const middleName = faker.person.middleName();
    const phone = faker.phone.number('+1##########');

    await prisma.client.create({
      data: {
        firstName,
        lastName,
        middleName,
        phone,
        organization: {
          connect: { id: organization.id },
        },
        // You can also associate a user here if needed
      },
    });
  }

  console.log(`Seeded ${numberOfClients} clients.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
