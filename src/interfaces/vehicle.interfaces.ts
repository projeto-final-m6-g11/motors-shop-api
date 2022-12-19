import { Image } from "../entities/image.entity";

export interface IVehicle {
  announcementType: string;
  title: string;
  year: number;
  km: number;
  price: number;
  description: string;
  vehicleType: string;
  published: boolean;
  images: string[];
}
