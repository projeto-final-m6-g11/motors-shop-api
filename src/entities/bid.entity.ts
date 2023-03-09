import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";

@Entity('bid')
export class Bid {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column( "decimal", { precision: 12 , scale: 2 } )
    bid: number

    @Column( "decimal", { precision: 12 , scale: 2 } )
    highestBid: number

    @CreateDateColumn({ type: 'date' })
    createdAt: Date

    @ManyToOne(() => Announcement, (announcement) => announcement.bids)
    announcement: Announcement
}
