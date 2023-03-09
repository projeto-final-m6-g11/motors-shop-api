import { Router } from "express";
import { postBidController } from "../controllers/bids.controllers";

const bidRoutes = Router()

bidRoutes.post("", postBidController)

export default bidRoutes
