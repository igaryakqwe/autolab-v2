import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string | null;
      username: string | null;
      firstName: string | null;
      lastName: string | null;
      middleName: string | null;
      birthDate: string | null;
      phone: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image: string | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    birthDate: string | null;
    gender: string;
    phone: string | null;
  }
}

declare module 'next-auth/jwt' {
  type JWT = {
    id: string;
    email: string;
    name: string;
    image: string | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    birthDate: string | null;
    phone: string | null;
  };
}
