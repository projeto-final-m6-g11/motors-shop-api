import { Router } from "express";
import announcementsGetController from "../controllers/announcements.controllers";

const announcementsRoutes = Router()

announcementsRoutes.get("", announcementsGetController)

export default announcementsRoutes
