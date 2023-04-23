import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { BookTypes } from "../typing/myBook";

export class CreateMyBooksDto {
  @IsNumber()
  public userId: number;
}

export class GetBooksByTypeDto extends CreateMyBooksDto {
  @IsEnum(BookTypes)
  @IsOptional()
  public type: BookTypes | null;
}
