import React from "react";

import Dropdown from "@components/Dropdown";
import NotFound from "@components/NotFound";
import SearchForm from "@components/SearchForm";
import GitHubStore from "@store/GitHubStore";
import { Option } from "@store/GitHubStore/GitHubStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

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
  const [params, setParams] = useSearchParams({ search: "", type: "all" });

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      gitHubStore.fetchRepos();
    },
    [gitHubStore]
  );

  const setCurrentParams = (search: string, type: string) => {
    setParams({ search, type });
  };

  const onChange = React.useCallback(
    (str: string) => {
      gitHubStore.setValue(str);
      setCurrentParams(str, params.get("type") || "all");
    },
    [gitHubStore, setParams, params]
  );

  const onChangeType = React.useCallback(
    (type: Option) => {
      gitHubStore.setType(type);
      setCurrentParams(params.get("search") || "", type.key);
    },
    [gitHubStore, params, setParams]
  );

  React.useEffect(() => {
    if (params.get("search")) {
      gitHubStore.setValue(params.get("search"));
      if (params.get("type")) {
        gitHubStore.setType(
          optionsType.find((obj) => obj.key === params.get("type"))
        );
      }
      gitHubStore.fetchRepos();
    }
  }, []);

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
            onChange={onChangeType}
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
