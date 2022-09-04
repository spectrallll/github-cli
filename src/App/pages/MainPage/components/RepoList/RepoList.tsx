import React from "react";

import Card from "@components/Card";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import Repositories, { Repository } from "@store/GitHubStore/GitHubStore";
import { RepositoryModel } from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import timeConverter from "@utils/timeConverter";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import styles from "./RepoList.module.scss";

type RepoListProps = {
  repositories: RepositoryModel[];
  more: boolean;
  state: string;
  fetchData: () => void;
};

const RepoList: React.FC<RepoListProps> = ({
  repositories,
  fetchData,
  more,
  state,
}) => {
  const navigate = useNavigate();

  return (
    <InfiniteScroll
      className={styles.columns}
      next={fetchData}
      hasMore={more}
      loader={
        state === Meta.loading && (
          <Loader size={LoaderSize.l} className={styles.center} />
        )
      }
      dataLength={repositories.length}
    >
      {repositories.map((obj) => {
        return (
          <Card
            key={obj.id}
            image={obj.owner.avatarUrl}
            title={obj.name}
            subtitle={obj.owner.login}
            updatedAt={timeConverter(obj.updatedAt)}
            link={obj.owner.htmlUrl}
            stars={obj.stargazersCount}
            onClick={(e: MouseEvent) => {
              navigate(`${obj.owner.login}/${obj.name}`);
            }}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default React.memo(RepoList);
