export enum Routes {
  Home = '/',
  SignIn = '/auth/sign-in',
  SignUp = '/auth/sign-up',
  Approve = '/auth/sign-up/approve',
  Dashboard = '/dashboard',
  Account = '/dashboard/account',
  AccountSettings = '/dashboard/account/settings',
  AccountSecurity = '/dashboard/account/settings?tab=account',
  AccountOrganizations = '/dashboard/account/settings?tab=organizations',
  Organization = '/dashboard/organization/:id',
}

export enum OrganizationRoutes {
  Home = '/dashboard/organization?organizationId=:id',
  Clients = '/dashboard/organization/clients?organizationId=:id',
  Employees = '/dashboard/organization/employees?organizationId=:id',
  Services = '/dashboard/organization/services?organizationId=:id',
  Vehicles = '/dashboard/organization/vehicles?organizationId=:id',
  Settings = '/dashboard/organization/settings?organizationId=:id',
}

export const publicRoutes = [Routes.Home];
export const authRoutes = [Routes.SignIn, Routes.SignUp, Routes.Approve];
export const privateRoutes = [
  Routes.Dashboard,
  Routes.Account,
  Routes.AccountSettings,
];
