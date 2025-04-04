import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import EmployeeService from '@/server/api/routers/employee/employee.service';
import { z } from 'zod';
import { EmployeeRole } from '@/types/organization';

const employeeService = new EmployeeService();

const employeeRoute = createTRPCRouter({
  getAll: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return await employeeService.getEmployees(input);
  }),
  update: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
        role: z.nativeEnum(EmployeeRole),
      }),
    )
    .mutation(async ({ input }) => {
      const role = input.role;
      return await employeeService.updateEmployee(input.employeeId, role);
    }),
  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return await employeeService.deleteEmployee(input);
  }),
  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      await employeeService.deleteEmployees(input);
    }),
  getByEmailOrUsername: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await employeeService.getByEmailOrUsername(input);
    }),
  inviteEmployee: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        organizationId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await employeeService.inviteEmployee(
        input.userId,
        input.organizationId,
      );
    }),
});

export default employeeRoute;
