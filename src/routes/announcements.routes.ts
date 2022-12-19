import { Router } from "express";
import {announcementsGetIdController,announcementsGetController, announcementsPostController} from "../controllers/announcements.controllers";

const announcementsRoutes = Router()

announcementsRoutes.get("", announcementsGetController)
announcementsRoutes.get("/:id", announcementsGetIdController)
announcementsRoutes.post("", announcementsPostController)

export default announcementsRoutes
