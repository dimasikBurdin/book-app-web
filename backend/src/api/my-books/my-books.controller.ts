import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateMyBookDto } from "../my-book/my-book.dto";
import { MyBook } from "../my-book/my-book.entity";
import { CreateMyBooksDto, GetBooksByTypeDto } from "./my-books.dto";
import { MyBooks } from "./my-books.entity";
import { MyBooksService } from "./my-books.service";

@ApiTags("my-books")
@Controller("api/my-books")
export class MyBooksController {
  @Inject(MyBooksService)
  private readonly service: MyBooksService;

  @Get("book/:id") // get all table
  public getMyBooks(@Param("id", ParseIntPipe) id: number): Promise<MyBooks> {
    return this.service.getMyBooks(id);
  }

  @Post("/create-books-table-temp")
  public createMyBooks(@Body() body: CreateMyBooksDto): Promise<MyBooks> {
    return this.service.createMyBooks(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post("add-book")
  public addBookToMyBooks(@Body() body: CreateMyBookDto): Promise<MyBooks> {
    return this.service.addBookToMyBooks(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":userId/book/:bookId")
  public deleteMyBook(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("bookId", ParseIntPipe) bookId: number,
  ): Promise<MyBooks> {
    return this.service.deleteMyBook(userId, bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":userId/:bookId")
  public getMyBook(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("bookId", ParseIntPipe) bookId: number,
  ): Promise<MyBook> {
    return this.service.getMyBook(userId, bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":userId")
  public getMyBooksByType(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() query: GetBooksByTypeDto,
  ): Promise<MyBook[]> {
    return this.service.getMyBooksByType({ userId, type: query.type });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":userId/:bookId")
  public isMyBooks(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("bookId", ParseIntPipe) bookId: number,
  ): Promise<boolean> {
    return this.service.isMyBook({ userId, bookId });
  }
}
