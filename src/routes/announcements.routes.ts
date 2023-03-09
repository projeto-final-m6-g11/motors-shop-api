import { Router } from "express";
import {announcementsGetIdController,announcementsGetController, announcementsPostController,announcementsGetCommentsByIDController, updateAnnouncementsController, deleteAnnouncement } from "../controllers/announcements.controllers";
import { postBidController } from "../controllers/bids.controllers";
import { postReviewController } from "../controllers/reviws.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const announcementsRoutes = Router();

announcementsRoutes.get("", announcementsGetController)
announcementsRoutes.get("/:id", announcementsGetIdController)
announcementsRoutes.patch("/:id", verifyAuthMiddleware, updateAnnouncementsController )
announcementsRoutes.delete("/:id",verifyAuthMiddleware, deleteAnnouncement )
announcementsRoutes.get("/:id/comments", announcementsGetCommentsByIDController)
announcementsRoutes.post("", verifyAuthMiddleware, announcementsPostController)
announcementsRoutes.post("/:id/comments",verifyAuthMiddleware,postReviewController)
announcementsRoutes.post("/:id/bids", verifyAuthMiddleware, postBidController)

export default announcementsRoutes;
