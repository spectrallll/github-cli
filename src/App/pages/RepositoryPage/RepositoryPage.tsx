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
import Topics from "./components/Topics";

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
      <div className={styles.left}>
        <Button className={styles.btn} onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <WithLoader loading={loading} className={styles.center}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={repository.owner.avatarUrl} alt="repo_image" />
            <div>
              <Topics data={repository.topics} />
            </div>
          </div>
          <div className={styles.data}>
            <Article
              data={
                <a href={repository.htmlUrl} target="_blank">
                  {repository.fullName}
                </a>
              }
              color={ArticleColor.secondary}
            />
            <Article
              data={repository.description}
              color={ArticleColor.secondary}
            />
            <Article
              data={
                timeConverter(`${timeConverter(repository.createdAt)}`) +
                " /" +
                ` ${timeConverter(repository.updatedAt)}`
              }
              color={ArticleColor.secondary}
            />
            <Article
              data={repository.language}
              color={ArticleColor.primary}
            />
            <Article
              data={repository.defaultBranch}
              color={ArticleColor.primary}
            />
          </div>
        </div>
      </WithLoader>
    </div>
  );
};

export default RepositoryPage;
