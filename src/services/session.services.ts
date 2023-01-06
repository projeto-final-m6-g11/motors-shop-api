import { compare, hash } from "bcryptjs";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { ILoginRequest } from "../interfaces/users.interfaces";
import { getAccountByEmail } from "./users.services";
import { User } from "../entities/user.entity";
import { IForgotRequest, IUpdateForgotPasswordRequest } from "../interfaces/auth.interfaces";
import AppDataSource from "../data-source";
import { v4 as uuid } from "uuid";
import { Recover } from "../entities/recover.entity";
import nodemailer from 'nodemailer';
import { smtpConfig } from "../utils/smtp.config";

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

export const createForgotPasswordRegister = async (requestBody: IForgotRequest) => {
    const { email } = requestBody

    const usersRepository = AppDataSource.getRepository(User)
    const recoverRepository = AppDataSource.getRepository(Recover)

    const user = await usersRepository.findOneBy({ email })

    if (!user) {
        throw new AppError('user not found');
    }

    const tokenId = uuid()

    const recoverToken = jwt.sign(
        {
          email
        },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "1h",
          subject: tokenId,
        }
    );

    const recover = {
        id: tokenId,
        token: recoverToken,
        user,
    }

    await recoverRepository.save(recover)

    const transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: false,
        auth: {
            user: smtpConfig.user,
            pass: smtpConfig.pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    await transporter.sendMail({
        text: `Aqui está seu link para alteração de senha http://localhost:3001/recoveraccount/${recover.token}`,
        subject: 'Recuperação de senha - Motors Shop Store',
        from: 'Mateus Kenzie <projetofinalm6g11@gmail.com>',
        to: [email]
    })

    return `email para recuperação de senha enviado para ${email}`
}

export const updatePasswordByToken = async (request: IUpdateForgotPasswordRequest) => {
  const { newPassword } = request.body
  const { id, email } = request.user

  const usersRepository = AppDataSource.getRepository(User)
  const recoverRepository = AppDataSource.getRepository(Recover)

  const user: any = await usersRepository.findOneBy({ email })
  const recoverInfo: any = await  recoverRepository.findOneBy({ id })

  if (!recoverInfo) {
    throw new AppError("token not found");
  }

  const hashedPassword = await hash(newPassword, 10)

  const userId = user.id
  const recoverId = recoverInfo.id
  
  await usersRepository.update(userId, { password: hashedPassword })
  await recoverRepository.update(recoverId, { updated: true })

  return ""
}
