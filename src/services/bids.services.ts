import AppDataSource from "../data-source";
import { Announcement } from "../entities/announcement.entity";
import { Bid } from "../entities/bid.entity";
import { AppError } from "../errors/AppError";
import { IBid, IBidPostRequest } from "../interfaces/bid.interfaces";
import { ITokenUserInfo } from "../interfaces/users.interfaces";

export const createNewBid = async (requestBid: IBidPostRequest, tokenUserInfo: ITokenUserInfo, announcementId: string) => {

    const announcementsRepository = AppDataSource.getRepository(Announcement)
    const bidsRepository = AppDataSource.getRepository(Bid)

    if(!announcementId) {
        throw new AppError("invalid announcement id", 403);
    }

    const announcement: any = await announcementsRepository.findOneBy({ id: announcementId })

    if ( announcement.bids.length === 0 ) {

        const newBid = {
            ...requestBid,
            announcement
        }

        bidsRepository.create(newBid)
        const createdBid = await bidsRepository.save(newBid)

        return createdBid
    }

    console.log(announcement.bids)

    for (let i = 0; i < announcement.bids.length; i++) {
        const bid = announcement.bids[i]
        let canCreateBid = true

        if (bid.bid >= requestBid.bid) {
            canCreateBid = false
            throw new AppError("you cannot bid less than or equal to the highest bid", 403);
        }

        if (i + 1 === announcement.bids.length || canCreateBid) {
            const newBid = {
                ...requestBid,
                announcement
            }
    
            bidsRepository.create(newBid)
            const createdBid = await bidsRepository.save(newBid)
    
            return createdBid
        }
    }

}
