import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import ServiceRecordService from '@/server/api/routers/service-record/service-record.service';
import {
  CreateServiceRecordDto,
  UpdateServiceRecordDto,
} from './service-record.dto';

const serviceRecordService = new ServiceRecordService();

const serviceRecordRouter = createTRPCRouter({
  getVehicleServiceRecords: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return serviceRecordService.getVehicleServiceRecords(input);
    }),

  createServiceRecord: protectedProcedure
    .input(CreateServiceRecordDto)
    .mutation(async ({ input }) => {
      return serviceRecordService.createServiceRecord(input);
    }),

  updateServiceRecord: protectedProcedure
    .input(UpdateServiceRecordDto)
    .mutation(async ({ input }) => {
      return serviceRecordService.updateServiceRecord(input.id, input);
    }),

  deleteServiceRecord: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return serviceRecordService.deleteServiceRecord(input);
    }),
});

export default serviceRecordRouter;
