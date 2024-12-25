import { auth } from '@/auth';
import {
  authRoutes,
  privateRoutes,
  publicRoutes,
  Routes,
} from '@/constants/routes';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname as Routes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as Routes);
  const isProtectedRoute = privateRoutes.includes(nextUrl.pathname as Routes);

  if (isPublicRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn)
      return NextResponse.redirect(new URL(Routes.Dashboard, nextUrl.origin));
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!isLoggedIn)
      return NextResponse.redirect(new URL(Routes.SignIn, nextUrl.origin));
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
