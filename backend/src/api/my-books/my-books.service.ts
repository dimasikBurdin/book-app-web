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

    const existBookIndex = myBooks.books.findIndex(
      (book) => book.book.book.id === newBook.id,
    );

    if (existBookIndex === -1) {
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

    if (myBooks.books[existBookIndex].book.type !== type) {
      const copyBooks = [...myBooks.books];
      copyBooks[existBookIndex].book.type = type;
      return this.repository.update(myBooks.id, {
        books: copyBooks,
      });
    }

    return null;
  }

  public async deleteMyBook(userId: number, bookId: number): Promise<any> {
    const myBooks = await this.repository.findOne({
      where: { userId },
    });

    const existBookIndex = myBooks.books.findIndex(
      (book) => book.book.book.id === bookId,
    );

    if (existBookIndex !== -1) {
      const copyBooks = [...myBooks.books];
      copyBooks.splice(existBookIndex, 1);
      // update to delete method
      return this.repository.update(myBooks.id, {
        books: copyBooks,
      });
    }

    return null;
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
    /**
     * TO DO
     * переписать на возвращаемое значение типа  {
     *  type: string (not enum)
     *  title: string
     *  books: Book[]
     * }
     *
     */
    return myBooks.books.filter(({ book }) => book.type === type);
  }

  public async isMyBook({
    bookId,
    userId,
  }: {
    bookId: number;
    userId: number;
  }): Promise<boolean> {
    const myBooks = await this.repository.findOne({
      where: { userId },
    });

    return !!myBooks.books.find(({ book }) => book.book.id === bookId);
  }
}
