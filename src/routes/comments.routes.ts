import { Router } from "express";
import { patchReviewController } from "../controllers/reviws.controller";
import verifyAdmOrOwnerMiddleware from "../middlewares/verifyAdmOrOwner.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const commentsRoutes = Router()

commentsRoutes.patch('/:id', verifyAuthMiddleware, patchReviewController)
commentsRoutes.delete('/:id', verifyAuthMiddleware)

export default commentsRoutes
