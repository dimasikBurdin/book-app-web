import { CircularProgress } from "@mui/material";
import React, { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "../../config/routes";

export const Routing: FC = () => {
  const AppContainer = lazy(() => import("../shared/app-container/index"));
  const MainPage = lazy(() => import("../../pages/main-page/index"));

  return (
    <Suspense fallback={<CircularProgress />}>
      <AppContainer>
        <Routes>
          <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
          <Route path={ROUTES.MY_BOOKS_PAGE} element={<>my_books_page</>} />
          <Route path={ROUTES.POPULAR} element={<>popular</>} />
          <Route path={ROUTES.PROFILE} element={<>profile</>} />
        </Routes>
      </AppContainer>
    </Suspense>
  );
};
