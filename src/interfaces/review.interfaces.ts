import { User } from "../entities/user.entity";

export interface IPostReview {
    text:string;
}

export interface IUpdateReview {
  text: string
  id: string
  userId: string
}

export interface IDeleteReview {
  id: string
  userId: string
}
