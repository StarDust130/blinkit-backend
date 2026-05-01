export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Marks this as an error we EXPECTED to happen (like a duplicate email)

    Error.captureStackTrace(this, this.constructor);
  }
}
