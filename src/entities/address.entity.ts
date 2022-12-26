import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', nullable: false })
    cep: string | undefined

    @Column({ type: 'varchar', nullable: false, length: 2 })
    state: string  | undefined

    @Column({ type: 'varchar', nullable: false })
    city: string | undefined

    @Column({ type: 'varchar', nullable: false })
    district: string | undefined

    @Column({ type: 'integer', nullable: false })
    number: string | undefined

    @Column({ type: 'varchar', nullable: true, length: 127 })
    complement: string | undefined

    @OneToMany(() => User, user => user.address)
    users: User[] | undefined
}
