import { Request, Response } from "express"
import { createUser } from "../services/users.services"

export const postUserController = async (request: Request, response: Response) => {
    const newUser = await createUser(request)

    return response.status(201).json(newUser)
}
