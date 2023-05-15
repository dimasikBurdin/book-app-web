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
import { CreateBookDto } from "./book.dto";
import { Book } from "./book.entity";
import { BookService } from "./book.service";

@ApiTags("book")
@Controller("api/book")
export class BookController {
  @Inject(BookService)
  private readonly service: BookService;

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  public getBook(@Param("id", ParseIntPipe) id: number): Promise<Book> {
    return this.service.getBook(id);
  }

  @Post()
  public createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.service.createBook(body);
  }
}
