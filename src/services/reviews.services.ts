import AppDataSource from "../data-source";
import { Announcement } from "../entities/announcement.entity";
import { Review } from "../entities/reviews.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import {
  IDeleteReview,
  IPostReview,
  IUpdateReview,
} from "../interfaces/review.interfaces";

export const postReviewService = async (
  { text }: IPostReview,
  announcementId: string,
  userId: string
): Promise<Review> => {
  const userRepository = AppDataSource.getRepository(User);
  const reviewRepository = AppDataSource.getRepository(Review);
  const announcementRepository = AppDataSource.getRepository(Announcement);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found!", 404);
  }
  const announcement = await announcementRepository.findOneBy({
    id: announcementId,
  });

  if (!announcement) {
    throw new AppError("User not found!", 404);
  }

  const newReview = reviewRepository.create({
    text,
    user: user!,
    announcement: announcement!,
  });

  await reviewRepository.save(newReview);

  return newReview;
};

export const updateReview = async ({ text, id, userId }: IUpdateReview) => {
  const commentsRepository = AppDataSource.getRepository(Review);
  const usersRepository = AppDataSource.getRepository(User);

  const userToVerify = await usersRepository.findOneBy({ id: userId });
  const commentToUpdate = await commentsRepository.findOneBy({ id });

  if (!commentToUpdate) {
    throw new AppError("comment not found", 404);
  }

  const userReviews: any = userToVerify?.review;

  if (!userToVerify?.isAdm) {
    for (let i = 0; i < userReviews.length; i++) {
      const review = userReviews[i];

      if (review.id === id) {
        await commentsRepository.update(id, { text });
        return true;
      }
    }
  } else {
    await commentsRepository.update(id, { text });
    return true;
  }

  throw new AppError("Unauthorized", 401);
};

export const deleteReview = async ({ id, userId }: IDeleteReview) => {
  const commentsRepository = AppDataSource.getRepository(Review);
  const usersRepository = AppDataSource.getRepository(User);

  const userToVerify = await usersRepository.findOneBy({ id: userId });
  const commentToUpdate = await commentsRepository.findOneBy({ id });

  if (!commentToUpdate) {
    throw new AppError("comment not found", 404);
  }

  const userReviews: any = userToVerify?.review;

  for (let i = 0; i < userReviews.length; i++) {
    const review = userReviews[i];

    if (review.id === id) {
      await commentsRepository.delete(id);

      return true;
    }
  }

  throw new AppError("Unauthorized", 401);
};
