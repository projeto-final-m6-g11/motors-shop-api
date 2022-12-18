import { Router } from "express";
import {announcementsGetIdController,announcementsGetController} from "../controllers/announcements.controllers";

const announcementsRoutes = Router()

announcementsRoutes.get("", announcementsGetController)
announcementsRoutes.get("/:id", announcementsGetIdController)

export default announcementsRoutes
