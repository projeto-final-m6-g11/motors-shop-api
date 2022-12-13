import { Request, Response } from "express"

export const createUserController = async (request: Request, response: Response) => {
    return response.json({ message: "rota de cadastro de usuário" })
}
