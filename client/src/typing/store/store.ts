import { BookStore } from "./book.store";
import { CommonStore } from "./common.store";

export interface Store {
  books: BookStore;
  common: CommonStore;
}
