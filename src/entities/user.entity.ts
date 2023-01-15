import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Address } from "./address.entity";
import { Announcement } from "./announcement.entity";
import { Recover } from "./recover.entity";
import { Review } from "./reviews.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", nullable: false, length: 127 })
  name: string

  @Column({ type: "varchar", nullable: false })
  email: string

  @Column({ type: "varchar", nullable: false, length: 11 })
  cpf: string

  @Column({ type: "varchar", nullable: false, length: 11 })
  phone: string

  @Column({ type: "date", nullable: false })
  birthdate: Date

  @Column({ type: "varchar", nullable: false, length: 255 })
  bio: string

  @Column({ type: "varchar", nullable: false })
  @Exclude()
  password: string

  @Column({ type: "boolean", nullable: false })
  isAdvertiser: boolean

  @Column({ type: "boolean" })
  isAdm: boolean

  @ManyToOne(() => Address, (address) => address.users, { eager: true })
  address: Address

  @OneToMany(() => Announcement, (announcement) => announcement.user, { eager: true })
  announcements: Announcement[]

  @OneToMany(()=> Review, review=> review.user, { eager: true })
  review : Review[]

  @OneToMany(()=> Recover, recover => recover.user)
  recover: Recover[]
}
