import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity('image')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', length: 255, nullable: false })
    imageUrl: string | undefined

    @Column({ type: 'varchar', length: 20, nullable: true })
    type: string | undefined

    @ManyToOne(() => Vehicle, vehicle => vehicle.images )
    vehicle: Vehicle | undefined
}
