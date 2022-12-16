import { Express } from "express";

import announcementsRoutes from "./announcements.routes";

export const appRoutes = (app: Express) => {
  app.use("/announcements", announcementsRoutes);
};
