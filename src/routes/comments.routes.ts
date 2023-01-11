import { Router } from "express";
import {
  deleteReviewController,
  patchReviewController,
} from "../controllers/reviws.controller";
import verifyAdmOrOwnerReviewMiddleware from "../middlewares/verifyAdmOrOwnewReview.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const commentsRoutes = Router();

commentsRoutes.patch(
  "/:id",
  verifyAuthMiddleware,
  verifyAdmOrOwnerReviewMiddleware,
  patchReviewController
);
commentsRoutes.delete(
  "/:id",
  verifyAuthMiddleware,
  verifyAdmOrOwnerReviewMiddleware,
  deleteReviewController
);

export default commentsRoutes;
