import { Request, Response } from "express"
import { createAuth, createForgotPasswordRegister, updatePasswordByToken } from "../services/session.services";
    
export const postAuthController = async (request: Request, response: Response) => {
    const token = await createAuth(request);

    return response.json({ token });
}

export const postForgotPasswordController = async (request: Request, response: Response) => {
    const forgotPasswordInfo = await createForgotPasswordRegister(request.body)

    return response.json({ message: forgotPasswordInfo })
}

export const patchForgotPasswordController = async (request: Request, response: Response) => {
    await updatePasswordByToken(request)

    return response.json({ message: 'password changed with success' })
}
