import React from "react";

import classNames from "classnames";

import styles from "./Article.module.scss";

export enum ArticleColor {
  primary = "primary",
  secondary = "secondary",
}

type ArticleProps = {
  data: string | React.ReactNode;
  color: ArticleColor;
  link?: string;
};

const Article: React.FC<ArticleProps> = ({ data, color, link }) => {
  return (
    <div
      className={classNames(
        styles.sample,
        color === ArticleColor.primary && styles.primary
      )}
    >
      {data}
    </div>
  );
};

export default Article;
