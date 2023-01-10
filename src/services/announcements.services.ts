import AppDataSource from "../data-source";
import { Announcement } from "../entities/announcement.entity";
import { Image } from "../entities/image.entity";
import { User } from "../entities/user.entity";
import {
  IannoumentsRequest,
  IAnnouncementWithUser,
} from "../interfaces/announcement.interfaces";
import { AppError } from "../errors/AppError";
import { announcementsGetController } from "../controllers/announcements.controllers";

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
      review: {
        user: true,
      },
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

export const listCommentsByAnnouncementsId = async (id: string) => {
  const vehicleRepository = AppDataSource.getRepository(Announcement);
  const vehicles = await vehicleRepository.findOne({
    where: {
      id,
    },
    relations: {
      review: {
        user: true,
      },
    },
  });

  if (!vehicles) {
    throw new AppError("Announcement not found", 404);
  }

  return vehicles?.review;
};

export const updateAnnouncements = async (
  {
    announcementType,
    title,
    year,
    km,
    price,
    description,
    vehicleType,
    published,
    images,
  }: IannoumentsRequest,
  id: string
) => {
  const announcementRespositoy = AppDataSource.getRepository(Announcement);

  const findAnnouncement = await announcementRespositoy.findOneBy({ id });
  
  const imageRepository = AppDataSource.getRepository(Image);

  if (!findAnnouncement) {
    throw new AppError("Announcement not found", 404);
  }

  await announcementRespositoy.update(id, {
    announcementType:announcementType ? announcementType: findAnnouncement.announcementType,
    title:title ? title: findAnnouncement.title,
    year:year ? year: findAnnouncement.year,
    km:km ? km: findAnnouncement.km,
    price:price ? price: findAnnouncement.price,
    description:description ? description: findAnnouncement.description,
    vehicleType:vehicleType ? vehicleType: findAnnouncement.vehicleType,
    published:published ? published: findAnnouncement.published
  });
  
  const announcementRes = await announcementRespositoy.findOneBy({id})
    
    if(images){
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
    
        const carImage = imageRepository.create({
          imageUrl: image,
          announcement: announcementRes!,
          type: i === 0 ? "COVER" : "GALLERY",
        });
    
        await imageRepository.save(carImage);
    
        if (i + 1 === images.length) {
          return await announcementRespositoy.findOne({
            where: {
              id: id,
            },
            relations: {
              user: true,
            },
          });
        }
      }
    }



    return announcementRes;
};
