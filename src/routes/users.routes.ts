import { Router } from "express";
import {
  postUserController,
  updateUserController,
  updateUserAddressController,
  getUserController,
  getUserIdController,
} from "../controllers/users.controller";

import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyAdmOrOwnerMiddleware from "../middlewares/verifyAdmOrOwner.middleware";

const usersRoutes = Router();

usersRoutes.post("", postUserController);
usersRoutes.patch(
  "/:id",
  verifyAuthMiddleware,
  updateUserController
);
usersRoutes.patch(
  "/addresses/:id",
  verifyAuthMiddleware,
  verifyAdmOrOwnerMiddleware,
  updateUserAddressController
);
usersRoutes.get("",
verifyAuthMiddleware,
verifyAdmOrOwnerMiddleware, 
getUserController);

usersRoutes.get("/:id",
getUserIdController);

export default usersRoutes;
