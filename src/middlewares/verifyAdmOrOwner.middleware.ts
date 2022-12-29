import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError, handleError } from "../errors/AppError";

const verifyAdmOrOwnerMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { id, isAdm } = req.user;
    const { id: paramsId } = req.params;

    if (!isAdm || !(id === paramsId)) {
      throw new AppError("Unauthorized!", 403);
    } else {
      next();
    }
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default verifyAdmOrOwnerMiddleware;
