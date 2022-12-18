import { Request, Response } from "express";
import AppError from "../errors/AppError";
import announcementesList from "../services/announcementsList.services";

const announcementsGetController = async (req: Request, resp: Response) => {
    const listAnnouncements = await announcementesList()

    return resp.json(listAnnouncements)
};

export default announcementsGetController;