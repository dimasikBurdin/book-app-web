import { Module } from "@nestjs/common";
import { MyBooksController } from "./my-books.controller";
import { MyBooksService } from "./my-books.service";

@Module({
  controllers: [MyBooksController],
  providers: [MyBooksService],
})
export class MyBooksModule {}
