'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '@/lib/s3';
import RequestError from '@/server/common/request-error';
import {
  ErrorCodes,
  ErrorMessages,
} from '@/server/common/enums/error-codes.enum';

export const uploadImageToS3 = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file provided');
  }

  const fileExtension = file.name.split('.').pop();
  const fileName = `avatars/${id}/${crypto.randomUUID()}.${fileExtension}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: file.type,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  const response = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (response.ok) {
    return {
      success: true,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`,
    };
  } else {
    throw new RequestError({
      code: ErrorCodes.FAILED_TO_UPDATE_AVATAR,
      message: ErrorMessages.FAILED_TO_UPDATE_AVATAR,
    });
  }
};
