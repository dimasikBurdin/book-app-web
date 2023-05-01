import { CircularProgress } from "@mui/material";
import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "../../config/routes";

export const Routing: FC = () => {
  const AppContainer = lazy(() => import("../shared/app-container/index"));
  const MainPage = lazy(() => import("../../pages/main-page/index"));
  const BookPage = lazy(() => import("../../pages/book-page/index"));
  const NotFoundPage = lazy(() => import("./components/not-found-page/index"));

  return (
    <Suspense fallback={<CircularProgress />}>
      <AppContainer>
        <Routes>
          <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
          <Route path={ROUTES.BOOK_PAGE} element={<BookPage />} />
          <Route path={ROUTES.MY_BOOKS_PAGE} element={<>my_books_page</>} />
          <Route path={ROUTES.POPULAR} element={<>popular</>} />
          <Route path={ROUTES.PROFILE} element={<>profile</>} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </AppContainer>
    </Suspense>
  );
};
