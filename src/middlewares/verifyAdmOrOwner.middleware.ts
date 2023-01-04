import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../errors/AppError";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyAdmOrOwnerMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { params } = req;
    const { id, isAdm } = req.user;

    const findUser = AppDataSource.getRepository(User);
    const foundUser = await findUser.findOneBy({ id });

    if (isAdm || foundUser?.address?.id === params.id) {
      next();
    } else {
      throw new AppError("Unauthorized!", 403);
    }
    
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default verifyAdmOrOwnerMiddleware;
