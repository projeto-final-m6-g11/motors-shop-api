import { Request, Response } from "express";
import { createNewBid } from "../services/bids.services";

export const postBidController = async (request: Request, response: Response) => {
    
    const newBid = await createNewBid(request.body, request.user, request.params.id)

    return response.json("funcionando!")
}