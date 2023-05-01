import { createReducer } from "@reduxjs/toolkit";
import { BookStore } from "../../typing/store/book.store";
import {
  setBestBooksAction,
  setBookAction,
  setMyBooksAction,
  setRecomendationBooksAction,
} from "../actions";

const initialState: BookStore = {
  bestBooks: [],
  myBooks: [],
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
    myBooks: action.payload,
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
    .addCase(setMyBooksAction, setMyBooks);
});
