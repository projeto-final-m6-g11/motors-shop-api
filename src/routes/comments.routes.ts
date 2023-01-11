import { Router } from "express";
import { deleteReviewController, patchReviewController } from "../controllers/reviws.controller";
import verifyAdmOrOwnerMiddleware from "../middlewares/verifyAdmOrOwner.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const commentsRoutes = Router()

commentsRoutes.patch('/:id', verifyAuthMiddleware, patchReviewController)
commentsRoutes.delete('/:id', verifyAuthMiddleware, deleteReviewController)

export default commentsRoutes
