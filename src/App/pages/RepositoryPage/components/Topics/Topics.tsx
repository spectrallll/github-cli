import React from "react";
import Topic from "../Topic";

import styles from "./Topics.module.scss";

type TopicsProps = {
  data: string[],
}

const Topics: React.FC<TopicsProps> = ({ data }) => {
  return (
    <>
      {
        data.length ?
        <div className={styles.topics}>
          {data.map((str) => {
            return (
              <Topic name={str} key={str} />
            );
          })}
        </div>
          :
        null
      }
    </>
  );
};

export default Topics;