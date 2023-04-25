import { ConnectorFlow } from "../typing/connector";

export const URLS = {
  [ConnectorFlow.BOOKS]: {
    GET_BEST_BOOKS: "/api/all-books/best-books",
    GET_RECOMENDATION_BOOKS: (userId: number) =>
      `/api/all-books/recomendations/${userId}`,
    GET_MY_BOOKS: (userId: number) => `/api/my-books/${userId}`,
  },
};
