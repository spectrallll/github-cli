import React from "react";

import Card from "@components/Card";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import GitHubStore from "@store/GitHubStore";
import { Meta } from "@utils/meta";
import timeConverter from "@utils/timeConverter";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import styles from "./RepoList.module.scss";

type RepoListProps = {
  store: GitHubStore;
};

const RepoList: React.FC<RepoListProps> = ({ store }) => {
  const navigate = useNavigate();

  const onCardClick = React.useCallback(
    (login: string, name: string) => {
      navigate(`${login}/${name}`);
    },
    [navigate]
  );

  return (
    <InfiniteScroll
      className={styles.columns}
      next={store.fetchData}
      hasMore={store.more}
      loader={
        store.meta === Meta.loading && (
          <Loader size={LoaderSize.l} className={styles.center} />
        )
      }
      dataLength={store.repositories.length}
    >
      {store.repositories.map((obj) => {
        return (
          <Card
            key={obj.id}
            image={obj.owner.avatarUrl}
            title={obj.name}
            subtitle={obj.owner.login}
            updatedAt={timeConverter(obj.updatedAt)}
            link={obj.owner.htmlUrl}
            stars={obj.stargazersCount}
            onClick={onCardClick}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default observer(RepoList);
