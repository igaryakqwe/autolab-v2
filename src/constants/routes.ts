export enum Routes {
  Home = '/',
  SignIn = '/auth/sign-in',
  SignUp = '/auth/sign-up',
  Approve = '/auth/sign-up/approve',
  Dashboard = '/dashboard',
  Account = '/dashboard/account',
  AccountSettings = '/dashboard/account/settings',
}

export const publicRoutes = [Routes.Home];
export const authRoutes = [Routes.SignIn, Routes.SignUp, Routes.Approve];
export const privateRoutes = [
  Routes.Dashboard,
  Routes.Account,
  Routes.AccountSettings,
];
