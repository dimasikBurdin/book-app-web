import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../book/book.entity";
import { BookTypes } from "../typing/myBook";

@Entity()
export class MyBook {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "json" })
  public book: {
    book: Book;
    type: BookTypes | null;
  };
}
