import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MyBooksController } from "./my-books.controller";
import { MyBooks } from "./my-books.entity";
import { MyBooksService } from "./my-books.service";

@Module({
  imports: [TypeOrmModule.forFeature([MyBooks])],
  controllers: [MyBooksController],
  providers: [MyBooksService],
})
export class MyBooksModule {}
