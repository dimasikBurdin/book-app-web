import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { BookTypes } from "../typing/myBook";

export class CreateMyBooksDto {
  @ApiProperty()
  @IsNumber()
  public userId: number;
}

export class GetBooksByTypeDto {
  @ApiProperty({ enum: BookTypes })
  @IsOptional()
  @IsEnum(BookTypes)
  public type: BookTypes | null;
}
