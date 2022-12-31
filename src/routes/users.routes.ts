import { Router } from "express";
import {
  postUserController,
  updateUserController,
  updateUserAddressController,
} from "../controllers/users.controller";

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
usersRoutes.patch(
  "/addresses/:id",
  verifyAuthMiddleware,
  verifyAdmOrOwnerMiddleware,
  updateUserAddressController
);

export default usersRoutes;
