import { Request, Response } from "express";

export const postBidController = async (request: Request, response: Response) => {
    return response.json("funcionando!")
}