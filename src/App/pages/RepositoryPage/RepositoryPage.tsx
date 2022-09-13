import React from "react";

import Button from "@components/Button";
import WithLoader from "@components/WithLoader";
import api from "@config/api";
import {
  FullRepository,
  normalizeFullRepository,
  RepositoryOwnerModel,
} from "@store/models/gitHub";
import getStringFromArr from "@utils/getStringFromArr";
import timeConverter from "@utils/timeConverter";
import { useNavigate, useParams } from "react-router-dom";

import Article from "./components/Article";
import { ArticleColor } from "./components/Article/Article";
import styles from "./RepositoryPage.module.scss";

const RepositoryPage = () => {
  const [loading, setLoading] = React.useState(false);

  const [repository, setRepository] = React.useState<FullRepository>({
    id: 0,
    name: "",
    updatedAt: "",
    htmlUrl: "",
    owner: {} as RepositoryOwnerModel,
    stargazersCount: "",
    topics: [],
    fullName: "",
    defaultBranch: "",
    description: "",
    language: "",
    createdAt: "",
  });

  const { owner, repo } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (owner && repo) {
        const { data } = await api.fetchOne(owner, repo);

        setRepository(normalizeFullRepository(data));
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
            <img src={repository.owner.avatarUrl} alt="" />
          </div>
          <div className={styles.data}>
            <Article
              title={"Name"}
              text={repository.fullName}
              color={ArticleColor.secondary}
              link={repository.htmlUrl}
            />
            <Article
              text={repository.description}
              color={ArticleColor.secondary}
              title={"Description"}
            />
            <Article
              text={
                timeConverter(`${timeConverter(repository.createdAt)}`) +
                " /" +
                ` ${timeConverter(repository.updatedAt)}`
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
              text={repository.defaultBranch}
              color={ArticleColor.primary}
              title={"Default branch"}
            />
            <Button className={styles.btnRight} onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </WithLoader>
    </div>
  );
};

export default RepositoryPage;
