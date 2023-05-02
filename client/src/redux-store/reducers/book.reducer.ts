import { createReducer } from "@reduxjs/toolkit";
import { BookStore } from "../../typing/store/book.store";
import {
  setBestBooksAction,
  setBookAction,
  setMyBooksAction,
  setMyFinishedBooksAction,
  setMyReadingBooksAction,
  setMyWantReadBooksAction,
  setRecomendationBooksAction,
} from "../actions";

const initialState: BookStore = {
  bestBooks: [],
  myBooks: {
    allMyBooks: [],
    finishedMyBooks: [],
    readingMyBooks: [],
    wantReadMyBooks: [],
  },
  recomendations: [],
  currentBook: null,
};

const setBestBooks = (
  state: BookStore,
  action: ReturnType<typeof setBestBooksAction>
): BookStore => {
  return {
    ...state,
    bestBooks: action.payload,
  };
};

const setRecomendationBooks = (
  state: BookStore,
  action: ReturnType<typeof setRecomendationBooksAction>
): BookStore => {
  return {
    ...state,
    recomendations: action.payload,
  };
};

const setMyBooks = (
  state: BookStore,
  action: ReturnType<typeof setMyBooksAction>
): BookStore => {
  return {
    ...state,
    myBooks: {
      ...state.myBooks,
      allMyBooks: action.payload,
    },
  };
};

const setMyReadingBooks = (
  state: BookStore,
  action: ReturnType<typeof setMyReadingBooksAction>
): BookStore => {
  return {
    ...state,
    myBooks: {
      ...state.myBooks,
      readingMyBooks: action.payload,
    },
  };
};

const setMyWantReadBooks = (
  state: BookStore,
  action: ReturnType<typeof setMyWantReadBooksAction>
): BookStore => {
  return {
    ...state,
    myBooks: {
      ...state.myBooks,
      wantReadMyBooks: action.payload,
    },
  };
};

const setMyFinishedBooks = (
  state: BookStore,
  action: ReturnType<typeof setMyFinishedBooksAction>
): BookStore => {
  return {
    ...state,
    myBooks: {
      ...state.myBooks,
      finishedMyBooks: action.payload,
    },
  };
};

const setBook = (
  state: BookStore,
  action: ReturnType<typeof setBookAction>
): BookStore => {
  return {
    ...state,
    currentBook: action.payload,
  };
};

export const bookReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBestBooksAction, setBestBooks)
    .addCase(setRecomendationBooksAction, setRecomendationBooks)
    .addCase(setBookAction, setBook)
    .addCase(setMyBooksAction, setMyBooks)
    .addCase(setMyReadingBooksAction, setMyReadingBooks)
    .addCase(setMyWantReadBooksAction, setMyWantReadBooks)
    .addCase(setMyFinishedBooksAction, setMyFinishedBooks);
});
