import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";

@Entity('image')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    imageUrl: string | undefined

    @Column({ type: 'varchar', length: 20, nullable: true })
    type: string | undefined

    @ManyToOne(() => Announcement, announcement => announcement.images )
    announcement: Announcement | undefined
}
