import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError, handleError } from "../errors/AppError";

const verifyAuthMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError("Invalid Token", 401);
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          throw new AppError("Invalid Token", 401);
        }

        req.user = {
          isAdm: decoded.isAdm,
          id: decoded.id,
          email: decoded.email,
        };

        next();
      }
    );
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default verifyAuthMiddleware;
