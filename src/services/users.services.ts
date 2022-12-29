import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import {
  ICreateUserRequest,
  IUpdateUserRequest,
} from "../interfaces/users.interfaces";
import { createAddress } from "../utils/user.utils";

export const createUser = async (request: ICreateUserRequest) => {
  const { name, email, cpf, phone, birthdate, bio, password, isAdm, address } =
    request.body;

  const usersRepository = AppDataSource.getRepository(User);
  const userEmailAlreadyExists = await usersRepository.findOne({
    where: { email },
  });
  const userCpfAlreadyExists = await usersRepository.findOne({
    where: { cpf },
  });

  if (userEmailAlreadyExists || userCpfAlreadyExists) {
    throw new AppError("email or cpf already registered");
  }

  const userAddress = await createAddress(address);

  const dateArray = birthdate.split("-");
  const newBirthDate = new Date(
    parseInt(dateArray[0]),
    parseInt(dateArray[1]),
    parseInt(dateArray[2])
  );

  const hashedPassword = await hash(password, 10);

  const userToRegister = {
    name,
    email,
    cpf,
    phone,
    birthdate: newBirthDate,
    bio,
    password: hashedPassword,
    isAdm,
    address: userAddress,
  };

  usersRepository.create(userToRegister);
  const newUser = await usersRepository.save(userToRegister);

  const newUserResponse = await usersRepository.findOneBy({ id: newUser.id });

  return {
    ...newUserResponse,
    password: undefined,
  };
};

export const updateUser = async (request: IUpdateUserRequest) => {
  const { name, email, cpf, phone, birthdate, bio, password, id } =
    request.body;
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  if (password) {
    user.password = await hash(password, 10);
  }

  if (birthdate) {
    const date = birthdate.split("-");
    const newBirthDate = new Date(
      parseInt(date[0]),
      parseInt(date[1]),
      parseInt(date[2])
    );
    user.birthdate = newBirthDate;
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.cpf = cpf || user.cpf;
  user.phone = phone || user.phone;
  user.bio = bio || user.bio;

  await usersRepository.save(user);

  return user;
};
