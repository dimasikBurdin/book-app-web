export enum BookTypes {
  READ_NOW = "read_now",
  WANT_READ = "want_read",
  FINISHED = "finished",
}

export interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  rate: number;
  reviews: string[];
  fullBook: string;
  cover: string;
}

export type Books = Book[];

export type BestBooks = Books;

export type RecomendationBooks = Books;

export type MyBook = {
  book: {
    book: Book;
    type: BookTypes;
  };
};

export type MyBooks = MyBook[];
