import React from "react";

import styles from "./Topic.module.scss";

type TopicProps = {
  name: string
}

const Topic: React.FC<TopicProps> = ({ name }) => {
  return (
    <div className={styles.topic}>
      {`#` + name}
    </div>
  );
};

export default Topic;