import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MyBooksService } from "../my-books/my-books.service";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(private myBooksService: MyBooksService) {}

  public async getUser(id: number): Promise<Omit<User, "password">> {
    const { password, ...user } = await this.repository.findOne({
      where: { userId: id },
    });
    return { ...user };
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = body.password;

    const newUser = await this.repository.save(user);

    await this.myBooksService.createMyBooks({ userId: newUser.userId });

    return newUser;
  }

  public async findOne(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }
}
