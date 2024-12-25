import { ErrorCodes, ErrorMessages } from './enums/error-codes.enum';

class RequestError extends Error {
  code: ErrorCodes;

  constructor({ code, message }: { code: ErrorCodes; message: ErrorMessages }) {
    super(message);
    this.code = code;
    this.name = 'CustomError';
  }
}

export default RequestError;
