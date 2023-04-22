import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsArray()
  public reviews: string[];
}
