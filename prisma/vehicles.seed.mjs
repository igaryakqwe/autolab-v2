import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// The specific organization ID provided by the user
const ORGANIZATION_ID = 'f3a6af13-401c-4ef9-8546-90003073d38d';

async function main() {
  // First, verify the organization exists
  const organization = await prisma.organization.findUnique({
    where: { id: ORGANIZATION_ID },
  });

  if (!organization) {
    console.error(`Organization with ID ${ORGANIZATION_ID} not found.`);
    return;
  }

  console.log(`Found organization: ${organization.name}`);

  // Find or create clients for this organization
  let clients = await prisma.client.findMany({
    where: { organizationId: ORGANIZATION_ID },
    take: 5,
  });

  // If no clients exist, create some
  if (clients.length === 0) {
    console.log(
      'No clients found for this organization. Creating new clients...',
    );

    for (let i = 0; i < 5; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const newClient = await prisma.client.create({
        data: {
          firstName,
          lastName,
          middleName: faker.person.middleName(),
          phone: faker.phone.number('+1##########'),
          organization: {
            connect: { id: ORGANIZATION_ID },
          },
        },
      });

      clients.push(newClient);
    }
  }

  console.log(`Working with ${clients.length} clients`);

  // Find employees for this organization
  const employees = await prisma.employee.findMany({
    where: { organizationId: ORGANIZATION_ID },
  });

  if (employees.length === 0) {
    console.error(
      'No employees found for this organization. Please create employees first.',
    );
    return;
  }

  // Find services for this organization
  let services = await prisma.service.findMany({
    where: { organizationId: ORGANIZATION_ID },
  });

  // If no services exist, create some
  if (services.length === 0) {
    console.log(
      'No services found for this organization. Creating new services...',
    );

    const serviceTypes = [
      'Oil Change',
      'Tire Rotation',
      'Brake Service',
      'Engine Tune-up',
      'Air Conditioning Service',
      'Battery Replacement',
      'Transmission Service',
      'Wheel Alignment',
    ];

    for (const title of serviceTypes) {
      const newService = await prisma.service.create({
        data: {
          title,
          description: faker.lorem.paragraph(),
          price: faker.number.float({ min: 50, max: 500, precision: 0.01 }),
          duration: faker.number.int({ min: 30, max: 240 }),
          organizationId: ORGANIZATION_ID,
        },
      });

      services.push(newService);
    }
  }

  // Create vehicles for each client
  const vehicles = [];
  for (const client of clients) {
    // Create 1-3 vehicles per client
    const vehicleCount = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < vehicleCount; i++) {
      const vehicleType = faker.helpers.arrayElement([
        'CAR',
        'MOTORCYCLE',
        'TRUCK',
        'VAN',
      ]);

      const vehicle = await prisma.vehicle.create({
        data: {
          type: vehicleType,
          make: faker.vehicle.manufacturer(),
          model: faker.vehicle.model(),
          year: faker.number.int({ min: 2010, max: 2023 }),
          licensePlate: faker.vehicle.vrm(),
          vin: faker.vehicle.vin(),
          engine: `${faker.vehicle.fuel()} ${faker.number.float({ min: 1.0, max: 6.0, precision: 0.1 })}L`,
          engineVolume: faker.number.float({
            min: 1.0,
            max: 6.0,
            precision: 0.1,
          }),
          notes: faker.lorem.sentence(),
          client: {
            connect: { id: client.id },
          },
        },
      });

      vehicles.push(vehicle);
    }
  }

  console.log(`Created ${vehicles.length} vehicles`);

  // Create service records
  const serviceRecords = [];
  for (const vehicle of vehicles) {
    // Create 1-5 service records per vehicle
    const recordCount = faker.number.int({ min: 1, max: 5 });

    for (let i = 0; i < recordCount; i++) {
      // Get a random client (the vehicle owner)
      const client = await prisma.client.findUnique({
        where: { id: vehicle.clientId },
      });

      if (!client) continue;

      // Get a random employee
      const employee =
        employees[faker.number.int({ min: 0, max: employees.length - 1 })];

      // Get 1-3 random services
      const serviceCount = faker.number.int({ min: 1, max: 3 });
      const selectedServices = faker.helpers.arrayElements(
        services,
        serviceCount,
      );

      // Calculate total price based on selected services
      const totalPrice = selectedServices.reduce(
        (sum, service) => sum + service.price,
        0,
      );

      // Create a date in the past year
      const startTime = faker.date.past({ years: 1 });

      // Some records are completed, some are still pending
      const status = faker.helpers.arrayElement([
        'PENDING',
        'IN_PROGRESS',
        'COMPLETED',
      ]);

      // If completed, add an end time
      let endTime = null;
      if (status === 'COMPLETED') {
        // Add a few hours to the start time
        endTime = new Date(startTime);
        endTime.setHours(
          endTime.getHours() + faker.number.int({ min: 1, max: 8 }),
        );
      }

      // Create the service record
      const serviceRecord = await prisma.serviceRecord.create({
        data: {
          startTime,
          endTime,
          status,
          notes: faker.lorem.paragraph(),
          totalPrice,
          organization: {
            connect: { id: ORGANIZATION_ID },
          },
          employee: {
            connect: { id: employee.id },
          },
          client: {
            connect: { id: client.userId || employee.userId }, // Connect to a User ID
          },
          vehicle: {
            connect: { id: vehicle.id },
          },
          services: {
            connect: selectedServices.map((service) => ({ id: service.id })),
          },
        },
      });

      serviceRecords.push(serviceRecord);
    }
  }

  console.log(`Created ${serviceRecords.length} service records`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
