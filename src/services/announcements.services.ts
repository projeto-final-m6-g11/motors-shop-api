import AppDataSource from "../data-source";
import { Vehicle } from "../entities/vehicle.entity";
import { Image } from "../entities/image.entity";
import { IVehicle } from "../interfaces/vehicle.interfaces";
import AppError from "../errors/AppError";

export const createAnAnnouncement = async ({ ...data }: IVehicle) => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const imageRepository = AppDataSource.getRepository(Image);

  const { images, ...car } = data;

  const newVehicle = vehicleRepository.create({ ...car });
  await vehicleRepository.save(newVehicle);

  for (let i = 0; i < images.length; i++){
    const image = images[i]

    const carImage = imageRepository.create({
      imageUrl: image,
      vehicle: newVehicle,
      type: i === 0 ? "COVER" : "GALLERY",
    });

    await imageRepository.save(carImage);

    if (i + 1 === images.length){
      return await vehicleRepository.findOneBy({ id: newVehicle.id})
    }
  }
};

export const announcementesGetId = async (id: string): Promise<Vehicle> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);

  const vehicles = await vehicleRepository.findOneBy({ id });

  if (!vehicles) {
    throw new AppError("Announcement not found", 404);
  }

  return vehicles;
};

export const announcementesList = async (): Promise<Vehicle[]> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);

  const vehicles = await vehicleRepository.find();

  return vehicles;
};
