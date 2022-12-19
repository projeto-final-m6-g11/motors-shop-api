import { Request, Response } from "express";
import AppError from "../errors/AppError";
import { IVehicle } from "../interfaces/vehicle.interfaces";
import { createAnAnnouncement, announcementesGetId, announcementesList } from "../services/announcements.services";

const announcementsGetController = async (req: Request, resp: Response) => {
    const listAnnouncements = await announcementesList()

    return resp.json(listAnnouncements)
};

export const announcementsPostController = async (req: Request, resp: Response) => {
    
    const {
        announcementType,
        description,
        images,
        km,
        price,
        published,
        title,
        vehicleType,
        year
    }: IVehicle = req.body

    const newAnnouncement = await createAnAnnouncement({
        announcementType,
        description,
        images,
        km,
        price,
        published,
        title,
        vehicleType,
        year
    })

    return resp.status(201).json(newAnnouncement)
};



const announcementsGetIdController = async (req: Request, resp: Response) => {
    const id:string = req.params.id 
    const listAnnouncements = await announcementesGetId(id)

    return resp.json(listAnnouncements)
};

export {announcementsGetIdController,announcementsGetController };