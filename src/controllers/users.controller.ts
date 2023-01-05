import { Request, Response } from "express";
import { AppError, handleError } from "../errors/AppError";
import {
  createUser,
  getallUsers,
  getUserId,
  updateUser,
  updateUserAddress,
} from "../services/users.services";
import { instanceToPlain } from "class-transformer";

export const postUserController = async (
  request: Request,
  response: Response
) => {
  const newUser = await createUser(request);

  return response.status(201).json(instanceToPlain(newUser));
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

export const updateUserAddressController = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.user.id;
    const { id } = request.params;
    const { cep, state, city, street, number, complement } = request.body;

    const address = { id, cep, state, city, street, number, complement };

    const updateAddress = await updateUserAddress(address, userId);
    return response
      .status(200)
      .json({ message: "Address successfully updated" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};

export const getUserController = async (
  request: Request,
  response: Response
) => {
  const userList = await getallUsers();

  return response.json(instanceToPlain(userList));
};
export const getUserIdController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.params.id;
  const userList = await getUserId(id);

  return response.json(instanceToPlain(userList));
};
