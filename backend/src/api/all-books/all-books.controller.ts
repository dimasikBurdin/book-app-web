import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Book } from "../book/book.entity";
import { AddBooksToAllBooksDto } from "./all-books.dto";
import { AllBooks } from "./all-books.entity";
import { AllBooksService } from "./all-books.service";

@ApiTags("all-books")
@Controller("api/all-books")
export class AllBooksController {
  @Inject(AllBooksService)
  private readonly service: AllBooksService;

  @Post("init-all-books")
  public initAllBooks(): Promise<AllBooks> {
    return this.service.initAllBooks();
  }

  @Post("add-books-to-all-books")
  public addBookToAllBooks(
    @Body() body: AddBooksToAllBooksDto,
  ): Promise<AllBooks> {
    return this.service.addBooksToAllBooks(body);
  }

  @Get("recomendations/:userId")
  public getRecomendations(
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<Book[]> {
    return this.service.getRecomendations(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("best-books")
  public getBestBooks(): Promise<Book[]> {
    return this.service.getBestBooks();
  }

  @Get("book/:bookId")
  public getBook(@Param("bookId", ParseIntPipe) bookId: number): Promise<Book> {
    return this.service.getBook(bookId);
  }
}
