import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const bookSelector = (state: Store) => state.books;

export const getBestBooksSelector = createSelector(
  [bookSelector],
  ({ bestBooks }) => {
    return bestBooks;
  }
);

export const getRecomendationBooksSelector = createSelector(
  [bookSelector],
  ({ recomendations }) => {
    return recomendations;
  }
);

export const getMyBooksSelector = createSelector(
  [bookSelector],
  ({ myBooks }) => {
    return myBooks.allMyBooks;
  }
);

export const getMyReadingBooksSelector = createSelector(
  [bookSelector],
  ({ myBooks }) => {
    return myBooks.readingMyBooks;
  }
);

export const getMyWantReadBooksSelector = createSelector(
  [bookSelector],
  ({ myBooks }) => {
    return myBooks.wantReadMyBooks;
  }
);
export const getMyFinishedBooksSelector = createSelector(
  [bookSelector],
  ({ myBooks }) => {
    return myBooks.finishedMyBooks;
  }
);

export const getCurrentBookSelector = createSelector(
  [bookSelector],
  ({ currentBook }) => {
    return currentBook;
  }
);
