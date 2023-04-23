import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../book/book.entity";
import { ALL_BOOKS_MOCK } from "../mock-api/all-books/allBooksMock";

@Entity()
export class AllBooks {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "json", default: ALL_BOOKS_MOCK })
  public books: Book[];
}
