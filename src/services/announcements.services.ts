import AppDataSource from "../data-source";
import { Vehicle } from "../entities/vehicle.entity";
import { Image } from "../entities/image.entity";
import { IVehicle } from "../interfaces/vehicle.interfaces";

const createAnAnnouncement = async ({ ...data }: IVehicle) => {
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

export default createAnAnnouncement;
