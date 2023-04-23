import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { BookTypes } from "../typing/myBook";

export class CreateMyBookDto {
  @ApiProperty()
  @IsNumber()
  public userId: number;

  @ApiProperty()
  @IsNumber()
  public bookId: number;

  @ApiProperty({ enum: BookTypes })
  @IsEnum(BookTypes)
  public type: BookTypes;
}
