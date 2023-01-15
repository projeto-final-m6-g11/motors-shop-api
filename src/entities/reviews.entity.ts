import { Column, Entity, ManyToOne, CreateDateColumn ,PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Announcement } from "./announcement.entity";
import { User } from "./user.entity";

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar',nullable: true })
    text: string

    @CreateDateColumn()
    createDate: Date

    @ManyToOne(()=> User)
    user: User
  
    @ManyToOne(()=> Announcement)
    announcement: Announcement
}
