import { Router } from "express";
import { patchForgotPasswordController, postAuthController, postForgotPasswordController } from "../controllers/session.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const sessionRoutes = Router()

sessionRoutes.post('', postAuthController)
sessionRoutes.post('/passwordrecover', postForgotPasswordController)
sessionRoutes.patch('/passwordrecover', verifyAuthMiddleware, patchForgotPasswordController)

export default sessionRoutes
