import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { Book } from "../book/book.entity";

export class AddBooksToAllBooksDto {
  @ApiProperty({ type: [Book] })
  @IsArray()
  public books: Book[];
}
