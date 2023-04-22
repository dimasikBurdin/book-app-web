import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMyBooksDto } from "./my-books.dto";
import { MyBooks } from "./my-books.entity";

@Injectable()
export class MyBooksService {
  @InjectRepository(MyBooks)
  private readonly repository: Repository<MyBooks>;

  public getMyBooks(userId: number): Promise<MyBooks> {
    return this.repository.findOne({ where: { userId } });
  }

  public createMyBooks(body: CreateMyBooksDto): Promise<MyBooks> {
    const myBooks: MyBooks = new MyBooks();

    myBooks.userId = body.userId;

    return this.repository.save(myBooks);
  }
}
