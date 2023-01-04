import { Router } from "express";
import {announcementsGetIdController,announcementsGetController, announcementsPostController,announcementsGetCommentsByIDController} from "../controllers/announcements.controllers";

const announcementsRoutes = Router()

announcementsRoutes.get("", announcementsGetController)
announcementsRoutes.get("/:id", announcementsGetIdController)
announcementsRoutes.get("/:id/comments", announcementsGetCommentsByIDController)
announcementsRoutes.post("", announcementsPostController)

export default announcementsRoutes
