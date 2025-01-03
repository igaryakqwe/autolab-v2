'use server';

import db from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        image: true,
        username: true,
        firstName: true,
        lastName: true,
        middleName: true,
        birthDate: true,
        phone: true,
        gender: true,
        password: true,
        emailVerified: true,
      },
    });
  } catch (error) {
    console.error('Error finding users by email:', error);
    throw new Error('Failed to find users by email');
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        image: true,
        username: true,
        firstName: true,
        lastName: true,
        middleName: true,
        birthDate: true,
        gender: true,
        phone: true,
      },
    });
  } catch (error) {
    console.error('Error finding users by id:', error);
    throw new Error('Failed to find users by id');
  }
};
