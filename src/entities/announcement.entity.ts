import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bid } from "./bid.entity";
import { Image } from "./image.entity";
import { Review } from "./reviews.entity";
import { User } from "./user.entity";

@Entity("announcement")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 20, nullable: false })
  announcementType: string

  @Column({ type: "varchar", length: 127, nullable: false })
  title: string

  @Column({ type: "integer", nullable: false })
  year: number

  @Column({ type: "integer", nullable: false })
  km: number

  @Column("decimal", { precision: 12, scale: 2, nullable: false })
  price: number

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string

  @Column({ type: "varchar", length: 20, nullable: false })
  vehicleType: string 

  @Column({ type: "boolean", nullable: false })
  published: boolean

  @OneToMany(() => Image, (image) => image.announcement, { eager: true })
  images: Image[]

  @ManyToOne(() => User, (user) => user.announcements)
  user: User

  @OneToMany(() => Review, (review) => review.announcement, { eager: true })
  review: Review[]

  @OneToMany(() => Bid, (bid) => bid.announcement, { eager: true })
  bids: Bid[]
}
