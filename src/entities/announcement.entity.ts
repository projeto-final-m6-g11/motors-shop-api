import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image.entity";
import { Review } from "./reviews.entity";
import { User } from "./user.entity";

@Entity('announcement')
export class Announcement {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', length: 20, nullable: false })
    announcementType: string | undefined

    @Column({ type: 'varchar', length: 127, nullable: false })
    title: string | undefined

    @Column({ type: 'integer', nullable: false })
    year: number | undefined

    @Column({ type: 'integer', nullable: false })
    km: number | undefined

    @Column('decimal', { precision: 12, scale: 2, nullable: false })
    price: number | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string | undefined

    @Column({ type: 'varchar', length: 20, nullable: false })
    vehicleType: string | undefined

    @Column({ type: 'boolean', nullable: false })
    published: boolean | undefined

    @OneToMany(() => Image, image => image.announcement, { eager: true })
    images: Image[] | undefined

    @ManyToOne(() => User, user => user.announcements)
    user: User | undefined

    @OneToMany(()=> Review, review=> review.announcement, { eager: true })
    review : Review[] | undefined
}


