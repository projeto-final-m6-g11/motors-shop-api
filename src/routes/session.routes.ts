import { Router } from "express";
import { postAuthController } from "../controllers/session.controller";

const sessionRoutes = Router()

sessionRoutes.post('', postAuthController)

export default sessionRoutes
