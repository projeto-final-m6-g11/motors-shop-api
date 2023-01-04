import AppDataSource from "../data-source";
import { Announcement } from "../entities/announcement.entity";
import { Image } from "../entities/image.entity";
import { User } from "../entities/user.entity";
import { IAnnouncementWithUser } from "../interfaces/announcement.interfaces";
import { AppError } from "../errors/AppError";

export const createAnAnnouncement = async ({
  userId,
  announcementType,
  title,
  year,
  km,
  price,
  description,
  vehicleType,
  published,
  images,
}: IAnnouncementWithUser) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const imageRepository = AppDataSource.getRepository(Image);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const newAnnouncement = announcementRepository.create({
    user,
    announcementType,
    title,
    year,
    km,
    price,
    description,
    vehicleType,
    published,
  });

  const showAnnouncement = await announcementRepository.save({
    ...newAnnouncement,
  });

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const carImage = imageRepository.create({
      imageUrl: image,
      announcement: showAnnouncement,
      type: i === 0 ? "COVER" : "GALLERY",
    });

    await imageRepository.save(carImage);

    if (i + 1 === images.length) {
      return await announcementRepository.findOne({
        where: {
          id: newAnnouncement.id,
        },
        relations: {
          user: true,
        },
      });
    }
  }
};

export const announcementesGetId = async (
  id: string
): Promise<Announcement> => {
  const vehicleRepository = AppDataSource.getRepository(Announcement);

  const vehicles = await vehicleRepository.findOne({
    where: {
      id,
    },
    relations: {
      user: true,
    },
  });

  if (!vehicles) {
    throw new AppError("Announcement not found", 404);
  }

  return vehicles;
};

export const announcementesList = async (): Promise<Announcement[]> => {
  const vehicleRepository = AppDataSource.getRepository(Announcement);

  const vehicles = await vehicleRepository.find({
    relations: {
      user: true,
    },
  });

  return vehicles;
};
