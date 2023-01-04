import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('recover')
export class Recover {
    @PrimaryColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    token: string

    @CreateDateColumn({ type: 'date' })
    createdAt: Date

    @Column({ type: 'boolean', default: false })
    updated: boolean

    @ManyToOne(() => User, user => user.recover)
    user: User
}
