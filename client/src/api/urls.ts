import { ConnectorFlow } from "../typing/connector";

export const URLS = {
  [ConnectorFlow.BOOKS]: {
    GET_BEST_BOOKS: "/api/all-books/best-books",
    GET_RECOMENDATION_BOOKS: (userId: number) =>
      `/api/all-books/recomendations/${userId}`,
    GET_BOOK: (bookId: number) => `/api/all-books/book/${bookId}`,
    GET_MY_BOOKS: (userId: number) => `/api/my-books/${userId}`,
    GET_MY_READING_BOOKS: (userId: number) =>
      `/api/my-books/${userId}?type=read_now`,
    GET_MY_WANT_READ_BOOKS: (userId: number) =>
      `/api/my-books/${userId}?type=want_read`,
    GET_MY_FINISHED_BOOKS: (userId: number) =>
      `/api/my-books/${userId}?type=finished`,
  },
};
