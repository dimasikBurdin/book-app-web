import { IsNumber } from "class-validator";

export class CreateMyBooksDto {
  @IsNumber()
  public userId: number;
}
