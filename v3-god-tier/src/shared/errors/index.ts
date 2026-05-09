// Shared error types and helpers
export class AppError extends Error {
  constructor(message = "App error") {
    super(message);
    this.name = "AppError";
  }
}
