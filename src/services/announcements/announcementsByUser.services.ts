import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";

const announcementsByUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userAnnoucements = await userRepository.findOneBy({ id });

  if (!userAnnoucements) {
    throw new AppError("User not found!", 404);
  }

  const { user, ...rest } = userAnnoucements;

  return rest;
};

export default announcementsByUserService;
