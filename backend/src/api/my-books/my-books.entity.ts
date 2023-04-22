import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../book/book.entity";

@Entity()
export class MyBooks {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "integer" })
  public userId: number;

  @Column({
    type: "json",
    default: [
      {
        id: 2,
        name: "test1",
        description: "descrition",
        rate: 5,
        reviews: ["string1", "string2"],
        fullBook: "<fullBook>",
        type: "first",
        cover: null,
      },
    ],
  })
  public books: Book[]; // написать тип MyBook - по сути просто Book с типом (читаю/прочитал/...) потому что в модели Book такое себе это хранить
}
