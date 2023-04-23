import { IsEnum, IsNumber } from "class-validator";
import { BookTypes } from "../typing/myBook";

export class CreateMyBookDto {
  @IsNumber()
  public userId: number;

  @IsNumber()
  public bookId: number;

  @IsEnum(BookTypes)
  public type: BookTypes;
}
