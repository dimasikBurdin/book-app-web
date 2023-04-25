import { createReducer } from "@reduxjs/toolkit";
import { BookStore } from "../../typing/store/book.store";
import {
  setBestBooksAction,
  setMyBooksAction,
  setRecomendationBooksAction,
} from "../actions";

const initialState: BookStore = {
  bestBooks: [],
  myBooks: [],
  recomendations: [],
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

export const bookReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBestBooksAction, setBestBooks)
    .addCase(setRecomendationBooksAction, setRecomendationBooks)
    .addCase(setMyBooksAction, setMyBooks);
});
