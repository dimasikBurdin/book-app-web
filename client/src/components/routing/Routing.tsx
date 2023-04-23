import React from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "../../config/routes";

export const Routing = () => {
  const TestPage = React.lazy(() => import("../../App"));
  return (
    <Routes>
      <Route path={ROUTES.MAIN_PAGE} element={<TestPage />} />
    </Routes>
  );
};
