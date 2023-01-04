import { Router } from "express";
import {
  announcementsGetIdController,
  announcementsGetController,
  announcementsPostController,
} from "../controllers/announcements.controllers";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const announcementsRoutes = Router();

announcementsRoutes.get("", announcementsGetController);
announcementsRoutes.get("/:id", announcementsGetIdController);
announcementsRoutes.post("", verifyAuthMiddleware, announcementsPostController);

export default announcementsRoutes;
