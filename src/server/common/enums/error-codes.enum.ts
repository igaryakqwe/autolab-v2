export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNKNOWN = 'UNKNOWN',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_SENDING_ERROR = 'EMAIL_SENDING_ERROR',
  FAILED_TO_GENERATE_TOKEN = 'FAILED_TO_GENERATE_TOKEN',
  EMAIL_VERIFICATION_ERROR = 'EMAIL_VERIFICATION_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  USER_NOT_VERIFIED = 'USER_NOT_VERIFIED',
  FAILED_TO_UPDATE_USER = 'FAILED_TO_UPDATE_USER',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  PHONE_ALREADY_EXIST = 'PHONE_ALREADY_EXIST',
  FAILED_TO_UPDATE_AVATAR = 'FAILED_TO_UPDATE_AVATAR',
  FAILED_TO_UPLOAD_LOGO = 'FAILED_TO_UPLOAD_LOGO',
  FAILED_TO_CREATE_ORGANIZATION = 'FAILED_TO_CREATE_ORGANIZATION',
}

export enum ErrorMessages {
  INTERNAL_SERVER_ERROR = 'Помилка серверу',
  UNKNOWN = 'Невідома помилка',
  USER_NOT_FOUND = 'Користувача не знайдено',
  USER_ALREADY_EXISTS = 'Користувач з такою електронною поштою вже існує',
  INVALID_CREDENTIALS = 'Невірний логін або пароль',
  EMAIL_SENDING_ERROR = 'Помилка при надсиланні листа',
  FAILED_TO_GENERATE_TOKEN = 'Помилка при генерації токену',
  EMAIL_VERIFICATION_ERROR = 'Помилка підтвердження пошти',
  TOKEN_EXPIRED = 'Термін дії токену закінчився. Ми відправили вам новий лист з підтвердженням',
  USER_NOT_VERIFIED = 'Ви не підтвердили свою електронну пошту. Ми відправили вам новий лист з підтвердженням',
  FAILED_TO_UPDATE_USER = 'Помилка при оновленні користувача',
  INVALID_PASSWORD = 'Невірний пароль',
  PHONE_ALREADY_EXIST = 'Користувач з таким номером телефону вже існує',
  FAILED_TO_UPDATE_AVATAR = 'Помилка при оновленні аватара',
  FAILED_TO_UPLOAD_LOGO = 'Помилка при завантаженні логотипу',
  FAILED_TO_CREATE_ORGANIZATION = 'Помилка при створенні організації',
}
