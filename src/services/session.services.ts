import { compare } from "bcryptjs";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { ILoginRequest } from "../interfaces/users.interfaces";
import { getAccountByEmail } from "./users.services";
import { User } from "../entities/user.entity";

export const createAuth = async (request: ILoginRequest) => {
  const { email, password } = request.body;

  if (!email || !password) {
    throw new AppError("invalid email or password.");
  }

  const account: User | any = await getAccountByEmail(email);

  if (!account) {
    throw new AppError("account not found.", 404);
  }

  const passwordIsValid = await compare(password, account.password);

  if (!passwordIsValid) {
    throw new AppError("invalid email or password.", 403);
  }

  const token = jwt.sign(
    {
      email: account.email,
      isAdm: account.isAdm,
      id: account.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "7d",
      subject: account.id,
    }
  );

  return token;
};
