import express from "express";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import announcementsRoutes from "./routes/announcements.routes";
import usersRoutes from "./routes/users.routes";
import SwaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";
import cors from "cors";
import sessionRoutes from "./routes/session.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/announcements", announcementsRoutes);
app.use("/login", sessionRoutes);

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
app.use(handleErrorMiddleware);

export default app;
