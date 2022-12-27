import { Router } from "express";
import { postUserController } from "../controllers/users.controller";

const usersRoutes = Router()

usersRoutes.post("", postUserController)

export default usersRoutes
