import { Router } from "express";
import { createUserController } from "../controllers/users.controller";

const usersRoutes = Router()

usersRoutes.get("", createUserController)

export default usersRoutes
