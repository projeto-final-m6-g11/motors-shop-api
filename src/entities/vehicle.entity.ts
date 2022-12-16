import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image.entity";

@Entity('vehicle')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', length: 20, nullable: false })
    announcementType: string | undefined

    @Column({ type: 'varchar', length: 127, nullable: false })
    title: string | undefined

    @Column({ type: 'integer', length: 4, nullable: false })
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

    @OneToMany(() => Image, image => image.vehicle, { eager: true })
    images: Image[] | undefined
}
