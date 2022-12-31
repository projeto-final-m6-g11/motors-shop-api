import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import { IUpdateAddress } from "../interfaces/address.interfaces";
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

export const getAccountByEmail = async (email: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const account = await usersRepository.findOneBy({ email: email });

  if (account) {
    return {
      ...account,
    };
  }

  return false;
};

export const updateUserAddress = async (
  address: IUpdateAddress,
  userId: string
) => {
  const { cep, state, city, district, number, complement, id } = address;

  const addressesRepository = AppDataSource.getRepository(Address);
  const findAddress = await addressesRepository.findOneBy({ id });
  if (!findAddress) {
    throw new AppError("Address not found!", 404);
  }

  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: userId });
  if (!findUser) {
    throw new AppError("User not found!", 404);
  }

  findAddress.cep = cep || findAddress.cep;
  findAddress.state = state || findAddress.state;
  findAddress.city = city || findAddress.city;
  findAddress.district = district || findAddress.district;
  findAddress.number = number || findAddress.number;
  findAddress.complement = complement || findAddress.complement;

  await addressesRepository.save(findAddress);

  return findAddress;
};
