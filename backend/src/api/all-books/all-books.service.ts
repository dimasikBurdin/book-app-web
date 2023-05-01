import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../book/book.entity";
import { AddBooksToAllBooksDto } from "./all-books.dto";
import { AllBooks } from "./all-books.entity";

@Injectable()
export class AllBooksService {
  @InjectRepository(AllBooks)
  private readonly repository: Repository<AllBooks>;

  public initAllBooks(): Promise<AllBooks> {
    const allBooks = new AllBooks();
    return this.repository.save(allBooks);
  }

  public async addBooksToAllBooks({
    books,
  }: AddBooksToAllBooksDto): Promise<any> {
    const allBooks = await this.repository.findOne({ where: { id: 1 } });
    return this.repository.update(allBooks.id, {
      books: [...allBooks.books, ...books],
    });
  }

  public getRecomendations(userId: number, limit = 30): Promise<Book[]> {
    return this.repository
      .findOne({ where: { id: 1 } })
      .then((e) => e.books.sort(() => 0.5 - Math.random()).slice(0, limit));
  }

  public getBestBooks(limit = 30): Promise<Book[]> {
    return this.repository
      .findOne({ where: { id: 1 } })
      .then((e) => e.books.sort(() => 0.5 - Math.random()).slice(0, limit));
  }

  public getBook(bookId: number): Promise<Book> {
    return this.repository
      .findOne({ where: { id: 1 } })
      .then((e) => e.books.find((e) => e.id === bookId));
  }
}
