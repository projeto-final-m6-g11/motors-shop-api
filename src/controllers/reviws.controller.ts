import { Request, Response } from "express"
import { IPostReview } from "../interfaces/review.interfaces";
import { postReviewService, updateReview } from "../services/reviews.services";
    
export const postReviewController = async (req: Request, res: Response) => {

    const id = req.user.id
    
    const dados:IPostReview = req.body 

    const announcementId = req.params.id
    
    const newReview = await postReviewService(dados,announcementId,id);

    return res.status(201).json(newReview);
}

export const patchReviewController = async (req: Request, res: Response) => {
    const { text } = req.body
    const { id } = req.params
    const userId = req.user.id

    await updateReview({ text, id, userId })

    return res.json({ message: "comment updated with success" })
}