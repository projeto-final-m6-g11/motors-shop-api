import { Router } from "express";
import {announcementsGetIdController,announcementsGetController, announcementsPostController,announcementsGetCommentsByIDController, updateAnnouncementsController, deleteAnnouncement } from "../controllers/announcements.controllers";
import { deleteBidController, patchBidController, postBidController } from "../controllers/bids.controllers";
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
announcementsRoutes.delete("/:id/bids/:bidId", verifyAuthMiddleware, deleteBidController)
announcementsRoutes.patch("/:id/bids/:bidId", verifyAuthMiddleware, patchBidController)

export default announcementsRoutes;
