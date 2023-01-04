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
  id: string | undefined;

  @Column({ type: "varchar", nullable: false, length: 127 })
  name: string | undefined;

  @Column({ type: "varchar", nullable: false })
  email: string | undefined;

  @Column({ type: "varchar", nullable: false, length: 11 })
  cpf: string | undefined;

  @Column({ type: "varchar", nullable: false, length: 11 })
  phone: string | undefined;

  @Column({ type: "date", nullable: false })
  birthdate: Date | undefined;

  @Column({ type: "varchar", nullable: false, length: 255 })
  bio: string | undefined;

  @Column({ type: "varchar", nullable: false })
  @Exclude()
  password: string | undefined;

  @Column({ type: "boolean" })
  isAdm: boolean | undefined;

  @ManyToOne(() => Address, (address) => address.users, { eager: true })
  address: Address | undefined;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[] | undefined;

  @OneToMany(()=> Review, review=> review.user, { eager: true })
  review : Review[] | undefined

  @OneToMany(()=> Recover, recover => recover.user)
  recover: Recover[] | undefined
}
