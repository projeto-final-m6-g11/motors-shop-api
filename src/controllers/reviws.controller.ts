import { Request, Response } from "express"
import { IPostReview } from "../interfaces/review.interfaces";
import { deleteReview, postReviewService, updateReview } from "../services/reviews.services";
    
export const postReviewController = async (req: Request, res: Response) => {

    const id = req.user.id
    
    const dados:IPostReview = req.body 

    const announcementId = req.params.id
    
    const newReview = await postReviewService(dados,announcementId,id);

    return res.status(201).json(newReview);
}

export const patchReviewController = async (request: Request, response: Response) => {
    const { text } = request.body
    const { id } = request.params
    const userId = request.user.id

    await updateReview({ text, id, userId })

    return response.json({ message: "comment updated with success" })
}

export const deleteReviewController = async (request: Request, response: Response) => {
    const { id } = request.params
    const userId = request.user.id

    await deleteReview({ id, userId })

    return response.status(204).json({})
}
