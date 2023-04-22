import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CreateMyBooksDto } from "./my-books.dto";
import { MyBooks } from "./my-books.entity";
import { MyBooksService } from "./my-books.service";

@Controller("api/my-books")
export class MyBooksController {
  @Inject(MyBooksService)
  private readonly service: MyBooksService;

  @Get(":id")
  public getMyBooks(@Param("id", ParseIntPipe) id: number): Promise<MyBooks> {
    return this.service.getMyBooks(id);
  }

  @Post()
  public createMyBooks(@Body() body: CreateMyBooksDto): Promise<MyBooks> {
    return this.service.createMyBooks(body);
  }
}
