import { Request, Response } from "express";
import AppError from "../errors/AppError";
import announcementesGetId from "../services/announcementsIdlist.services";
import announcementesList from "../services/announcementsList.services";

const announcementsGetController = async (req: Request, resp: Response) => {
    const listAnnouncements = await announcementesList()

    return resp.json(listAnnouncements)
};



const announcementsGetIdController = async (req: Request, resp: Response) => {
    const id:string = req.params.id 
    const listAnnouncements = await announcementesGetId(id)

    return resp.json(listAnnouncements)
};

export {announcementsGetIdController,announcementsGetController };