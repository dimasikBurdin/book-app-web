import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AllBooksController } from "./all-books.controller";
import { AllBooks } from "./all-books.entity";
import { AllBooksService } from "./all-books.service";

@Module({
  imports: [TypeOrmModule.forFeature([AllBooks])],
  controllers: [AllBooksController],
  providers: [AllBooksService],
})
export class AllBooksModule {}
