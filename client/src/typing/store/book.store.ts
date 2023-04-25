import { BestBooks, MyBooks, RecomendationBooks } from "../book";

export interface BookStore {
  myBooks: MyBooks;
  recomendations: RecomendationBooks;
  bestBooks: BestBooks;
}
