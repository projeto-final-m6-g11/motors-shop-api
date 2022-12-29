import { Request, Response } from "express";
import { AppError, handleError } from "../errors/AppError";
import { createUser, updateUser } from "../services/users.services";

export const postUserController = async (
  request: Request,
  response: Response
) => {
  const newUser = await createUser(request);

  return response.status(201).json(newUser);
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;
    const { name, email, cpf, phone, birthdate, bio, password } = request.body;

    const updatedUser = await updateUser(request);
    const { password: newPassword, ...user } = updatedUser;

    return response.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
