import { Request, Response } from "express"
import { IPostReview } from "../interfaces/review.interfaces";
import { postReviewService } from "../services/reviews.services";
    
export const postReviewController = async (req: Request, res: Response) => {

    const id = req.user.id
    
    const dados:IPostReview = req.body 

    const announcementId = req.params.id
    
    const newReview = await postReviewService(dados,announcementId,id);

    return res.status(201).json(newReview);
}