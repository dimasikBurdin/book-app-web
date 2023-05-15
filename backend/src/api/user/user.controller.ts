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
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("api/user")
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  public getUser(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Omit<User, "password">> {
    return this.service.getUser(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
