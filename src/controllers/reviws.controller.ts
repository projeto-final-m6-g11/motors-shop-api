import { Request, Response } from "express"
    
export const postAuthController = async (request: Request, response: Response) => {
    const token = await (request);

    return response.json({ token });
}