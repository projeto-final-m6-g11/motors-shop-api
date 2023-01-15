import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', nullable: false })
    cep: string

    @Column({ type: 'varchar', nullable: false, length: 2 })
    state: string

    @Column({ type: 'varchar', nullable: false })
    city: string

    @Column({ type: 'varchar', nullable: false })
    street: string

    @Column({ type: 'integer', nullable: false })
    number: string

    @Column({ type: 'varchar', nullable: true, length: 127 })
    complement: string

    @OneToMany(() => User, user => user.address)
    users: User[]
}
