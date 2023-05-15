import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AllBooks } from "../all-books/all-books.entity";
import { MyBooksController } from "./my-books.controller";
import { MyBooks } from "./my-books.entity";
import { MyBooksService } from "./my-books.service";

@Module({
  imports: [TypeOrmModule.forFeature([MyBooks, AllBooks])],
  controllers: [MyBooksController],
  providers: [MyBooksService],
  exports: [MyBooksService],
})
export class MyBooksModule {}
