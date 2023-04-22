import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookDto } from "./book.dto";
import { Book } from "./book.entity";

@Injectable()
export class BookService {
  @InjectRepository(Book)
  private readonly repository: Repository<Book>;

  public getBook(id: number): Promise<Book> {
    return this.repository.findOne({ where: { id } });
  }

  public createBook(body: CreateBookDto): Promise<Book> {
    const book: Book = new Book();

    book.name = body.name;
    book.reviews = body.reviews;

    return this.repository.save(book);
  }
}
