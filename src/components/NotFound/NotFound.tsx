import React from "react";

import styles from "./NotFound.module.scss";

type NotFoundProps = {
  text: string;
};

const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  return <div className={styles.notFound}>{text}</div>;
};

export default NotFound;
