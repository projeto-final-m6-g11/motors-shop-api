import AppDataSource from "../data-source";
import { Vehicle } from "../entities/vehicle.entity";
import AppError from "../errors/AppError";


const announcementesGetId = async(id:string): Promise<Vehicle> =>{
    const vehicleRepository = AppDataSource.getRepository(Vehicle)

    const vehicles = await vehicleRepository.findOneBy({id})

    if (!vehicles){
        throw new AppError("Vehicles not found",404)
    }
    
    return vehicles
}

export default announcementesGetId