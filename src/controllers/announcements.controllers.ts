import { Request, Response } from "express";
import { AppError, handleError } from "../errors/AppError";
import {
  announcementesGetId,
  announcementesList,
  createAnAnnouncement,
  deleteAnnouncementService,
  listCommentsByAnnouncementsId,
  updateAnnouncements,
} from "../services/announcements.services";
import { IAnnouncement, IannoumentsRequest, IAnnouncementAuction } from "../interfaces/announcement.interfaces";
import { instanceToPlain } from "class-transformer";

export const announcementsGetController = async (req: Request, resp: Response) => {
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

export const announcementsGetIdController = async (req: Request, resp: Response) => {
  const id: string = req.params.id;
  const listAnnouncements = await announcementesGetId(id);

  return resp.json(instanceToPlain(listAnnouncements));
};

export const announcementsGetCommentsByIDController = async (
  req: Request,
  resp: Response
) => {
  const id: string = req.params.id;
  const listCommentsOfAnnouncements = await listCommentsByAnnouncementsId(id);

  return resp.json(instanceToPlain(listCommentsOfAnnouncements));
};

export const updateAnnouncementsController = async (req: Request,res: Response) => {
  const announcement: IannoumentsRequest = req.body
  const id : string = req.params.id
  const updateAnnouncementsRes = await updateAnnouncements(announcement,id)

  return res.json(updateAnnouncementsRes)

};
export const deleteAnnouncement = async (req:Request, res:Response) => {
  const id :string = req.params.id
  await deleteAnnouncementService(id)
  return res.status(204).send()

}
