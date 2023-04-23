import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../book/book.entity";
import { MyBooksController } from "./my-books.controller";
import { MyBooks } from "./my-books.entity";
import { MyBooksService } from "./my-books.service";

@Module({
  imports: [TypeOrmModule.forFeature([MyBooks, Book])],
  controllers: [MyBooksController],
  providers: [MyBooksService],
})
export class MyBooksModule {}
