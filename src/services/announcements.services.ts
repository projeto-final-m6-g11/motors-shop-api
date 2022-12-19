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

export default createAnAnnouncement;
