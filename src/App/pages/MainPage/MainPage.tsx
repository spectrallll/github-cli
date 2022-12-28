import React from "react";

import Dropdown from "@components/Dropdown";
import NotFound from "@components/NotFound";
import GitHubStore from "@store/GitHubStore";
import { Option } from "@store/GitHubStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import RepoList from "./components/RepoList";
import styles from "./MainPage.module.scss";
import Input from "@components/Input";

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
  const [params, setParams] = useSearchParams();

  const onChange = React.useCallback(
    (str: string) => {
      gitHubStore.setValue(str);
      setParams({ search: str || "", type: params.get("type") || "all" });
    },
    [setParams, params]
  );

  const onChangeType = React.useCallback(
    (type: Option) => {
      gitHubStore.setType(type);
      setParams({ search: params.get("search") || "", type: type.key });
    },
    [gitHubStore, params, setParams]
  );

  React.useEffect(() => {
    if (params.get("search")) {
      gitHubStore.setValue(params.get("search") || "");
      if (params.get("type")) {
        gitHubStore.setType(
          optionsType.find((obj) => obj.key === params.get("type")) || { key: "all", name: "All"}
        );
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Input
          value={gitHubStore.value}
          onChange={onChange}
          className={styles.search}
          placeholder={"Введите название организации..."}
        />
        <Dropdown
          options={optionsType}
          currentValue={gitHubStore.type}
          onChange={onChangeType}
          title={"Type:"}
        />
      </div>
      <div className={styles.repos}>
        <RepoList store={gitHubStore} />
        {gitHubStore.meta === Meta.error && (
          <NotFound text={`Organisation not found 😕`} />
        )}
      </div>
    </div>
  );
};

export default observer(MainPage);