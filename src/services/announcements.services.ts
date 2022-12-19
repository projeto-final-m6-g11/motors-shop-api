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

  images.forEach(async (image, index) => {
    const imageCar = imageRepository.create({
      imageUrl: image,
      vehicle: newVehicle,
      type: index === 0 ? "CAPA" : "GALERIA",
    });
    await imageRepository.save(imageCar);
  });

  const returnedCar = () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const car = await vehicleRepository.findOneBy({ id: newVehicle.id });

        resolve(car);
      }, 500);
    });
  };

  return returnedCar();
};

export const announcementesGetId = async (id: string): Promise<Vehicle> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);

  const vehicles = await vehicleRepository.findOneBy({ id });

  if (!vehicles) {
    throw new AppError("Vehicles not found", 401);
  }

  return vehicles;
};

export const announcementesList = async (): Promise<Vehicle[]> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);

  const vehicles = await vehicleRepository.find();

  return vehicles;
};

