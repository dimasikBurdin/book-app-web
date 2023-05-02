import { BestBooks, Book, MyBooks, RecomendationBooks } from "../book";

export interface BookStore {
  myBooks: {
    allMyBooks: MyBooks;
    readingMyBooks: MyBooks;
    wantReadMyBooks: MyBooks;
    finishedMyBooks: MyBooks;
  };
  recomendations: RecomendationBooks;
  bestBooks: BestBooks;
  currentBook: Book | null;
}
