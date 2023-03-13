import { Request, Response } from "express";
import { createNewBid, deleteBidService } from "../services/bids.services";

export const postBidController = async (request: Request, response: Response) => {
    
    const newBid = await createNewBid(request.body, request.user, request.params.id)

    return response.status(201).json(newBid)
}

export const deleteBidController = async (request: Request, response: Response) => {

    await deleteBidService(request.params.id, request.params.bidId, request.user)

    return response.status(204).json({})
}

export const patchBidController = async (request: Request, response: Response) => {

}
