import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import ServiceRecordService from '@/server/api/routers/service-record/service-record.service';
import {
  CreateServiceRecordSchema,
  UpdateServiceRecordSchema,
} from '@/server/api/routers/service-record/service-record.dto';

const serviceRecordService = new ServiceRecordService();

const serviceRecordRouter = createTRPCRouter({
  getVehicleServiceRecords: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return serviceRecordService.getVehicleServiceRecords(input);
    }),

  getOrganizationServiceRecords: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return serviceRecordService.getOrganizationServiceRecords(input);
    }),

  createServiceRecord: protectedProcedure
    .input(CreateServiceRecordSchema)
    .mutation(async ({ input }) => {
      return serviceRecordService.createServiceRecord(input);
    }),

  updateServiceRecord: protectedProcedure
    .input(UpdateServiceRecordSchema)
    .mutation(async ({ input }) => {
      return serviceRecordService.updateServiceRecord(input);
    }),

  deleteServiceRecord: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return serviceRecordService.deleteServiceRecord(input);
    }),
});

export default serviceRecordRouter;
