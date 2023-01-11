import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../errors/AppError";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyAdmOrOwnerReviewMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { params } = req;
    const { id } = params;
    const { id: idUser, isAdm } = req.user;

    const findUser = AppDataSource.getRepository(User);
    const foundUser = await findUser.findOneBy({ id: idUser });
    const selectedReview = foundUser?.review?.filter((el) => el.id === id)[0];

    if (isAdm || selectedReview?.id) {
      next();
    } else {
      throw new AppError("Unauthorized! You are not the owner", 403);
    }
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default verifyAdmOrOwnerReviewMiddleware;
