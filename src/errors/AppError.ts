import { Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number = 400,
    error: boolean = false
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode || 400;
  }
}

export const handleError = (err: AppError, resp: Response) => {
  const { statusCode, message } = err;
  return resp.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
