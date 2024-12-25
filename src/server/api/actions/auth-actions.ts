'use server';

import db from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
      },
    });
  } catch (error) {
    console.error('Error finding users by email:', error);
    throw new Error('Failed to find users by email');
  }
};

export const generateToken = async (email: string) => {
  const token = uuid();
  const expires = DateTime.now().plus({ days: 1 }).toJSDate();

  try {
    const existingToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          email_token: {
            email: existingToken.email,
            token: existingToken.token,
          },
        },
      });
    }

    await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

export const getToken = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error('Error finding token:', error);
    throw new Error('Failed to find token');
  }
};
