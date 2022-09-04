import React from "react";

import Card from "@components/Card";
import Dropdown from "@components/Dropdown";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import NotFound from "@components/NotFound";
import SearchForm from "@components/SearchForm";
import timeConverter from "@utils/timeConverter";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import Repositories, { Option } from "../../store/repositories";
import styles from "./MainPage.module.scss";

type MainPageProps = {
  store: typeof Repositories;
};

const optionsType: Option[] = [
  { key: "all", name: "All" },
  { key: "public", name: "Public" },
  { key: "forks", name: "Forks" },
  { key: "sources", name: "Sources" },
  { key: "member", name: "Member" },
  { key: "internal", name: "Internal" },
];

const MainPage: React.FC<MainPageProps> = observer(({ store }) => {
  const {
    repositories,
    fetchRepos,
    value,
    setValue,
    type,
    setType,
    state,
    more,
    fetchData,
  } = store;

  const firstFetch = React.useRef(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!firstFetch.current) {
      firstFetch.current = true;
    } else {
      fetchRepos();
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <SearchForm
          handleSubmit={fetchRepos}
          value={value}
          inputChange={(value: string) => setValue(value)}
        />
        <div className={styles.sort}>
          <Dropdown
            options={optionsType}
            currentValue={type}
            onChange={setType}
            title={"Type:"}
          />
        </div>
      </div>
      <div className={styles.repos}>
        <InfiniteScroll
          className={styles.columns}
          next={fetchData}
          hasMore={more}
          loader={
            state === "pending" && (
              <Loader size={LoaderSize.l} className={styles.center} />
            )
          }
          dataLength={repositories.length}
        >
          {repositories.map((obj) => {
            return (
              <Card
                key={obj.name}
                image={obj.owner.avatar_url}
                title={obj.name}
                subtitle={obj.owner.login}
                updatedAt={timeConverter(obj.updated_at)}
                link={obj.owner.html_url}
                stars={obj.stargazers_count}
                onClick={(e) => {
                  navigate(`${obj.owner.login}/${obj.name}`);
                }}
              />
            );
          })}
        </InfiniteScroll>
        {state === "error" && <NotFound text={`Organisation not found 😕`} />}
      </div>
    </div>
  );
});

export default MainPage;
