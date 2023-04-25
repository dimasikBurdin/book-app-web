import { CircularProgress } from "@mui/material";
import React, { FC, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "../../config/routes";

export const Routing: FC = () => {
  const MainPage = React.lazy(() => import("../../pages/main-page/index"));

  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
      </Routes>
    </Suspense>
  );
};
