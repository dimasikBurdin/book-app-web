import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AllBooks } from "../all-books/all-books.entity";
import { CreateMyBookDto } from "../my-book/my-book.dto";
import { MyBook } from "../my-book/my-book.entity";
import { BookTypes } from "../typing/myBook";
import { CreateMyBooksDto } from "./my-books.dto";
import { MyBooks } from "./my-books.entity";

@Injectable()
export class MyBooksService {
  @InjectRepository(MyBooks)
  private readonly repository: Repository<MyBooks>;

  @InjectRepository(AllBooks)
  private readonly bookRepository: Repository<AllBooks>;

  public getMyBooks(userId: number): Promise<MyBooks> {
    return this.repository.findOne({ where: { userId } });
  }

  public createMyBooks({ userId }: CreateMyBooksDto): Promise<MyBooks> {
    const myBooks: MyBooks = new MyBooks();

    myBooks.userId = userId;

    return this.repository.save(myBooks);
  }

  public async addBookToMyBooks({
    bookId,
    type,
    userId,
  }: CreateMyBookDto): Promise<any> {
    const myBooks = await this.repository.findOne({
      where: { userId: userId },
    });

    const newBook = await this.bookRepository
      .findOne({
        where: { id: 1 },
      })
      .then((e) => e.books.find((book) => book.id === bookId));

    return this.repository.update(myBooks.id, {
      books: [
        ...myBooks.books,
        {
          book: {
            book: newBook,
            type: type || null,
          },
        },
      ],
    });
  }

  public async getMyBook(userId: number, bookId: number): Promise<MyBook> {
    const myBooks = await this.repository.findOne({
      where: { userId },
    });

    return myBooks.books.find(({ book }) => book.book.id === bookId);
  }

  public async getMyBooksByType({
    type,
    userId,
  }: {
    type: BookTypes | null;
    userId: number;
  }): Promise<MyBook[]> {
    const myBooks = await this.repository.findOne({
      where: { userId },
    });

    if (!type) {
      return myBooks.books;
    }

    return myBooks.books.filter(({ book }) => book.type === type);
  }
}
