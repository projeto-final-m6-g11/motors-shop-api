import { IBidPostRequest } from "../interfaces/bid.interfaces";
import { ITokenUserInfo } from "../interfaces/users.interfaces";

export const createNewBid = async (requestBid: IBidPostRequest, tokenUserInfo: ITokenUserInfo, annoucementId: string) => {
    console.log(requestBid, tokenUserInfo, annoucementId)

    return {}
}
