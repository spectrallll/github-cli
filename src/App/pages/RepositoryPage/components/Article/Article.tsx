import React from "react";

import classNames from "classnames";

import styles from "./Article.module.scss";

export enum ArticleColor {
  primary = "primary",
  secondary = "secondary",
}

type ArticleProps = {
  text: string;
  color: ArticleColor;
  title: string;
  link?: string;
};

const Article: React.FC<ArticleProps> = ({ text, color, title, link }) => {
  return (
    <div
      className={classNames(
        styles.sample,
        color === ArticleColor.primary && styles.primary
      )}
    >
      <span className={styles.title}>{title}</span>:{" "}
      {link ? (
        <a href={link} target={"_blank"} rel="noreferrer">
          {text}
        </a>
      ) : (
        text
      )}
    </div>
  );
};

export default Article;
