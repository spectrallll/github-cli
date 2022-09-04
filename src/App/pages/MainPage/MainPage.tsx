import React from "react";

import Dropdown from "@components/Dropdown";
import NotFound from "@components/NotFound";
import SearchForm from "@components/SearchForm";
import GitHubStore from "@store/GitHubStore";
import { Option } from "@store/GitHubStore/GitHubStore";
import rootStore from "@store/RootStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import qs from "qs";

import RepoList from "./components/RepoList";
import styles from "./MainPage.module.scss";

const optionsType: Option[] = [
  { key: "all", name: "All" },
  { key: "public", name: "Public" },
  { key: "forks", name: "Forks" },
  { key: "sources", name: "Sources" },
  { key: "member", name: "Member" },
  { key: "internal", name: "Internal" },
];

const MainPage = () => {
  const gitHubStore = useLocalStore(() => new GitHubStore());
  useQueryParamsStoreInit();
  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      gitHubStore.fetchRepos();
    },
    [gitHubStore]
  );

  const onChange = React.useCallback(
    (str: string) => {
      gitHubStore.setValue(str);
    },
    [gitHubStore]
  );

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <SearchForm
          handleSubmit={onSubmit}
          value={gitHubStore.value}
          inputChange={onChange}
        />
        <div className={styles.sort}>
          <Dropdown
            options={optionsType}
            currentValue={gitHubStore.type}
            onChange={gitHubStore.setType}
            title={"Type:"}
          />
        </div>
      </div>
      <div className={styles.repos}>
        <RepoList
          repositories={gitHubStore.repositories}
          more={gitHubStore.more}
          state={gitHubStore.meta}
          fetchData={gitHubStore.fetchData}
        />
        {gitHubStore.meta === Meta.error && (
          <NotFound text={`Organisation not found 😕`} />
        )}
      </div>
    </div>
  );
};

export default observer(MainPage);
