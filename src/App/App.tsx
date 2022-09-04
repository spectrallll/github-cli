import React from "react";

import "@styles/app.scss";
import qs from "qs";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useQueryParamsStoreInit } from "../store/RootStore/hooks/useQueryParamsStoreInit";
import MainPage from "./pages/MainPage/MainPage";
import RepositoryPage from "./pages/RepositoryPage/RepositoryPage";

const App = () => {
  useQueryParamsStoreInit();
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/:owner/:repo" element={<RepositoryPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
