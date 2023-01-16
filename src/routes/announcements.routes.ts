import { Router } from "express";
import {announcementsGetIdController,announcementsGetController, announcementsPostController,announcementsGetCommentsByIDController, updateAnnouncementsController, deleteAnnouncement, postAuctionController} from "../controllers/announcements.controllers";
import { postReviewController } from "../controllers/reviws.controller";
import verifyAdmOrOwnerMiddleware from "../middlewares/verifyAdmOrOwner.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const announcementsRoutes = Router();

announcementsRoutes.get("", announcementsGetController)
announcementsRoutes.get("/:id", announcementsGetIdController)
announcementsRoutes.patch("/:id", verifyAuthMiddleware, updateAnnouncementsController )
announcementsRoutes.delete("/:id",verifyAuthMiddleware, deleteAnnouncement )
announcementsRoutes.get("/:id/comments", announcementsGetCommentsByIDController)
announcementsRoutes.post("", verifyAuthMiddleware, announcementsPostController)
announcementsRoutes.post("/:id/comments",verifyAuthMiddleware,postReviewController)
announcementsRoutes.post('/auction', verifyAuthMiddleware, postAuctionController)

export default announcementsRoutes;
