import React from "react";

import "@styles/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import MainPage from "./pages/MainPage/MainPage";
import RepositoryPage from "./pages/RepositoryPage/RepositoryPage";
import Repositories from "./store/repositories";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<MainPage store={Repositories} />} />
            <Route path="/:owner/:repo" element={<RepositoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
