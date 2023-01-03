import { Column, Entity, ManyToOne, CreateDateColumn ,PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Announcement } from "./announcement.entity";
import { User } from "./user.entity";

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar',nullable: true })
    text: string | undefined

    @CreateDateColumn()
    createDate: Date | undefined

    @ManyToOne(()=> User)
    user: User | undefined
  
    @ManyToOne(()=> Announcement)
    announcement: Announcement | undefined
}
