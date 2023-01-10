import { Router } from "express";
import {announcementsGetIdController,announcementsGetController, announcementsPostController,announcementsGetCommentsByIDController, updateAnnouncementsController} from "../controllers/announcements.controllers";
import { postReviewController } from "../controllers/reviws.controller";
import verifyAdmOrOwnerMiddleware from "../middlewares/verifyAdmOrOwner.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const announcementsRoutes = Router();

announcementsRoutes.get("", announcementsGetController)
announcementsRoutes.get("/:id", announcementsGetIdController)
announcementsRoutes.patch("/:id", verifyAuthMiddleware, verifyAdmOrOwnerMiddleware, updateAnnouncementsController )
//verifyAdmOrOwnerMiddleware
announcementsRoutes.get("/:id/comments", announcementsGetCommentsByIDController)
announcementsRoutes.post("", verifyAuthMiddleware, announcementsPostController)
announcementsRoutes.post("/:id/comments",verifyAuthMiddleware,postReviewController)

export default announcementsRoutes;
