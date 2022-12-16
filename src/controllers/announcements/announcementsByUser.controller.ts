import { Request, Response } from "express";
import { handleError } from "../../errors/AppError";
import AppError from "../../errors/AppError";
import announcementsByUserService from "../../services/announcements/announcementsByUser.services";

const announcementsByUserController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const userAnnouncements = announcementsByUserService(id);

    return resp.json(userAnnouncements);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default announcementsByUserController;
