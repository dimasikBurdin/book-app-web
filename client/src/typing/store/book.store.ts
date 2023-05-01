import { BestBooks, Book, MyBooks, RecomendationBooks } from "../book";

export interface BookStore {
  myBooks: MyBooks;
  recomendations: RecomendationBooks;
  bestBooks: BestBooks;
  currentBook: Book | null;
}
