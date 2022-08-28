import React from "react";

import Button from "@components/Button";
import WithLoader from "@components/WithLoader";
import api from "@config/api";
import getStringFromArr from "@utils/getStringFromArr";
import timeConverter from "@utils/timeConverter";
import { useNavigate, useParams } from "react-router-dom";

import { Repository } from "../../store/repositories";
import Sample from "./components/Sample";
import styles from "./RepositoryPage.module.scss";

export type FullRepository = Repository & {
  topics: string[];
  full_name: string;
  created_at: string;
  default_branch: string;
  language: string;
  description: string;
};

const RepositoryPage = () => {
  const [loading, setLoading] = React.useState(false);

  const [repository, setRepository] = React.useState<FullRepository>({
    created_at: "",
    default_branch: "",
    description: "",
    full_name: "",
    html_url: "",
    language: "",
    name: "",
    owner: { avatar_url: "", html_url: "", login: "" },
    stargazers_count: "",
    topics: [],
    updated_at: "",
  });

  const { owner, repo } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (owner && repo) {
        const { data } = await api.fetchOne(owner, repo);
        setRepository(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [owner, repo]);

  return (
    <div className={styles.main}>
      <WithLoader loading={loading} className={styles.center}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={repository.owner.avatar_url} alt="" />
          </div>
          <div className={styles.data}>
            <Sample
              title={"Name"}
              text={repository.full_name}
              color={"secondary"}
              link={repository.html_url}
            />
            <Sample
              text={repository.description}
              color={"secondary"}
              title={"Description"}
            />
            <Sample
              text={
                timeConverter(`${timeConverter(repository.created_at)}`) +
                " /" +
                ` ${timeConverter(repository.updated_at)}`
              }
              title={"Created at/Updated at"}
              color={"secondary"}
            />
            <Sample
              text={getStringFromArr(repository.topics)}
              color={"secondary"}
              title={"Topics"}
            />
            <Sample
              text={repository.language}
              color={"primary"}
              title={"Language"}
            />
            <Sample
              text={repository.default_branch}
              color={"primary"}
              title={"Default branch"}
            />
            <Button onClick={() => navigate("/")}>Back</Button>
          </div>
        </div>
      </WithLoader>
    </div>
  );
};

export default RepositoryPage;
