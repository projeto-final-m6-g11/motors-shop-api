import { Router } from "express";

import announcementsByUserController from "../controllers/announcements/announcementsByUser.controller";

const announcementsRoutes = Router();

announcementsRoutes.get("/users/:id", announcementsByUserController);

export default announcementsRoutes;
