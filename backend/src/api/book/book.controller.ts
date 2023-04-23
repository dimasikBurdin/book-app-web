import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateBookDto } from "./book.dto";
import { Book } from "./book.entity";
import { BookService } from "./book.service";

@ApiTags("book")
@Controller("api/book")
export class BookController {
  @Inject(BookService)
  private readonly service: BookService;

  @Get(":id")
  public getBook(@Param("id", ParseIntPipe) id: number): Promise<Book> {
    return this.service.getBook(id);
  }

  @Post()
  public createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.service.createBook(body);
  }
}
