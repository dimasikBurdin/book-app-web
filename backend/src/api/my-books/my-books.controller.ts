import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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

  @Post("add-book")
  public addBookToMyBooks(@Body() body: CreateMyBookDto): Promise<MyBooks> {
    return this.service.addBookToMyBooks(body);
  }

  @Get(":userId/:bookId")
  public getMyBook(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("bookId", ParseIntPipe) bookId: number,
  ): Promise<MyBook> {
    return this.service.getMyBook(userId, bookId);
  }

  @Get(":userId")
  public getMyBooksByType(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() query: GetBooksByTypeDto,
  ): Promise<MyBook[]> {
    return this.service.getMyBooksByType({ userId, type: query.type });
  }
}
