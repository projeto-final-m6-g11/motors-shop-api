import { Router } from "express";
import { postUserController } from "../controllers/users.controller";
import { updateUserController } from "../controllers/users.controller";

import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyAdmOrOwnerMiddleware from "../middlewares/verifyAdmOrOwner.middleware";

const usersRoutes = Router();

usersRoutes.post("", postUserController);
usersRoutes.patch(
  "/:id",
  verifyAuthMiddleware,
  verifyAdmOrOwnerMiddleware,
  updateUserController
);

export default usersRoutes;
