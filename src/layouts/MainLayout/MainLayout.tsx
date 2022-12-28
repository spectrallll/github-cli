import React from "react";

import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.scss";

const MainLayout = () => {

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
