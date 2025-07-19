import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import VehicleService from '@/server/api/routers/vehicle/vehicle.service';
import { z } from 'zod';
import { CreateVehicleSchema } from './dto/vehicle.dto';

const vehicleService = new VehicleService();

const vehicleRouter = createTRPCRouter({
  getAllMakes: publicProcedure.query(async () => {
    return vehicleService.getAllMakes();
  }),

  getModels: publicProcedure
    .input(z.number().optional())
    .query(async ({ input }) => {
      console.log(input);
      return vehicleService.getModels(input);
    }),

  getVehicleById: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return vehicleService.getVehicleById(input);
    }),

  getVehiclesByOrganization: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return vehicleService.getVehiclesByOrganization(input);
    }),

  createVehicle: protectedProcedure
    .input(CreateVehicleSchema)
    .mutation(async ({ input }) => {
      return vehicleService.createVehicle(input);
    }),

  updateVehicle: protectedProcedure
    .input(CreateVehicleSchema)
    .mutation(async ({ input }) => {
      return vehicleService.updateVehicle(input);
    }),

  deleteVehicle: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return vehicleService.deleteVehicle(input);
    }),

  getVehiclesByClient: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return vehicleService.getVehiclesByClient(input);
    }),

  getVehiclesByUser: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return vehicleService.getVehiclesByUser(input);
    }),
});

export default vehicleRouter;
