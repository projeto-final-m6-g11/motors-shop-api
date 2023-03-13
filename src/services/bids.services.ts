import AppDataSource from "../data-source";
import { Announcement } from "../entities/announcement.entity";
import { Bid } from "../entities/bid.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import { IBid, IBidPostRequest } from "../interfaces/bid.interfaces";
import { ITokenUserInfo } from "../interfaces/users.interfaces";

export const createNewBid = async (requestBid: IBidPostRequest, tokenUserInfo: ITokenUserInfo, announcementId: string) => {

    const announcementsRepository = AppDataSource.getRepository(Announcement)
    const bidsRepository = AppDataSource.getRepository(Bid)
    const usersRepository = AppDataSource.getRepository(User)

    if(!announcementId) {
        throw new AppError("invalid announcement id", 403);
    }

    const announcement: any = await announcementsRepository.findOneBy({ id: announcementId })
    const user: any = await usersRepository.findOneBy({ id: tokenUserInfo.id })

    if ( announcement.bids.length === 0 ) {

        const newBid = {
            ...requestBid,
            announcement,
            user
        }

        bidsRepository.create(newBid)
        const createdBid = await bidsRepository.save(newBid)

        return createdBid
    }

    for (let i = 0; i < announcement.bids.length; i++) {
        const bid = announcement.bids[i]
        let canCreateBid = true

        if (bid.bid >= requestBid.bid) {
            canCreateBid = false
            throw new AppError("you cannot bid less than or equal to the highest bid", 403);
        }

        if (i + 1 === announcement.bids.length && canCreateBid) {
            const newBid = {
                ...requestBid,
                announcement,
                user
            }
    
            bidsRepository.create(newBid)
            const createdBid = await bidsRepository.save(newBid)
    
            return createdBid
        }
    }

}


export const deleteBidService = async (announcementId: string, bidId: string, tokenUserInfo: ITokenUserInfo) => {

    const usersRepository = AppDataSource.getRepository(User)
    const bidsRepository = AppDataSource.getRepository(Bid)

    const user: any = await usersRepository.findOne({ where: {
        id: tokenUserInfo.id
    }, relations: {
        bids: true
    } })

    for (let i = 0; i < user.bids.length; i++) {
        const bid = user.bids[i]
        let deleted = false

        if (bid.id === bidId) {
            deleted = true
            await bidsRepository.delete(bidId)
        }

        if (i + 1 === user.bids.length && !deleted) {
            throw new AppError("you do not have permission to perform this action", 401);
        }
    }
}

export const updateBid = async () => {
    
}
