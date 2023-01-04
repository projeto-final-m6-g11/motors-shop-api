import { Router } from "express";
import {announcementsGetIdController,announcementsGetController, announcementsPostController,announcementsGetCommentsByIDController} from "../controllers/announcements.controllers";
import { postReviewController } from "../controllers/reviws.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const announcementsRoutes = Router()

announcementsRoutes.get("", announcementsGetController)
announcementsRoutes.get("/:id", announcementsGetIdController)
announcementsRoutes.get("/:id/comments", announcementsGetCommentsByIDController)
announcementsRoutes.post("", announcementsPostController)
announcementsRoutes.post("/:id/comments",verifyAuthMiddleware,postReviewController)

export default announcementsRoutes
