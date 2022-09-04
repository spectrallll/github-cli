import React from "react";

import Button from "@components/Button";
import WithLoader from "@components/WithLoader";
import api from "@config/api";
import { RepositoryApi } from "@store/models/gitHub";
import getStringFromArr from "@utils/getStringFromArr";
import timeConverter from "@utils/timeConverter";
import { useNavigate, useParams } from "react-router-dom";

import Article from "./components/Article";
import { ArticleColor } from "./components/Article/Article";
import styles from "./RepositoryPage.module.scss";

export type FullRepository = RepositoryApi & {
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
            <Article
              title={"Name"}
              text={repository.full_name}
              color={ArticleColor.secondary}
              link={repository.html_url}
            />
            <Article
              text={repository.description}
              color={ArticleColor.secondary}
              title={"Description"}
            />
            <Article
              text={
                timeConverter(`${timeConverter(repository.created_at)}`) +
                " /" +
                ` ${timeConverter(repository.updated_at)}`
              }
              title={"Created at/Updated at"}
              color={ArticleColor.secondary}
            />
            <Article
              text={getStringFromArr(repository.topics)}
              color={ArticleColor.secondary}
              title={"Topics"}
            />
            <Article
              text={repository.language}
              color={ArticleColor.primary}
              title={"Language"}
            />
            <Article
              text={repository.default_branch}
              color={ArticleColor.primary}
              title={"Default branch"}
            />
            <Button className={styles.btnRight} onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        </div>
      </WithLoader>
    </div>
  );
};

export default RepositoryPage;
