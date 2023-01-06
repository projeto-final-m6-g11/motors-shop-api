import { Request, Response } from "express";
import { AppError, handleError } from "../errors/AppError";
import {
  announcementesGetId,
  announcementesList,
  createAnAnnouncement,
  listCommentsByAnnouncementsId,
} from "../services/announcements.services";
import { IAnnouncement } from "../interfaces/announcement.interfaces";
import { instanceToPlain } from "class-transformer";

const announcementsGetController = async (req: Request, resp: Response) => {
  const listAnnouncements = await announcementesList();

  return resp.json(instanceToPlain(listAnnouncements));
};

export const announcementsPostController = async (
  req: Request,
  resp: Response
) => {
  try {
    const userId = req.user.id;

    const {
      announcementType,
      description,
      images,
      km,
      price,
      published,
      title,
      vehicleType,
      year,
    }: IAnnouncement = req.body;

    const newAnnouncement = await createAnAnnouncement({
      userId,
      announcementType,
      description,
      images,
      km,
      price,
      published,
      title,
      vehicleType,
      year,
    });

    return resp.status(201).json(instanceToPlain(newAnnouncement));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

const announcementsGetIdController = async (req: Request, resp: Response) => {
  const id: string = req.params.id;
  const listAnnouncements = await announcementesGetId(id);

  return resp.json(instanceToPlain(listAnnouncements));
};

const announcementsGetCommentsByIDController = async (
  req: Request,
  resp: Response
) => {
  const id: string = req.params.id;
  const listCommentsOfAnnouncements = await listCommentsByAnnouncementsId(id);

  return resp.json(instanceToPlain(listCommentsOfAnnouncements));
};

export {
  announcementsGetIdController,
  announcementsGetController,
  announcementsGetCommentsByIDController,
};
