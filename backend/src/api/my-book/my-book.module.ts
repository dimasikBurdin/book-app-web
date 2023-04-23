import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../book/book.entity";
import { MyBooks } from "../my-books/my-books.entity";
import { MyBook } from "./my-book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MyBook, Book, MyBooks])],
})
export class MyBookModule {}
