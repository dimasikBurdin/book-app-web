import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MyBook } from "../my-book/my-book.entity";

@Entity()
export class MyBooks {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "integer" })
  public userId: number;

  @Column({
    type: "json",
    default: [],
  })
  public books: MyBook[];
}
