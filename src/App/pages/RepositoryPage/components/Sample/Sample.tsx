import React from "react";

import styles from "./Sample.module.scss";

type SampleProps = {
  text: string;
  color: "primary" | "secondary";
  title: string;
  link?: string;
};

const Sample: React.FC<SampleProps> = ({ text, color, title, link }) => {
  return (
    <div
      style={{ borderColor: color === "primary" ? "#FF5555" : "D9D9D9" }}
      className={styles.sample}
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

export default Sample;
