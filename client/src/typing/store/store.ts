import { BookStore } from "./book.store";
import { CommonStore } from "./common.store";
import { UserStore } from "./user.store";

export interface Store {
  books: BookStore;
  common: CommonStore;
  user: UserStore;
}
