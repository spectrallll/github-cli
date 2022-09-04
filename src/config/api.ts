import axios from "axios";

import { FullRepository } from "../App/pages/RepositoryPage/RepositoryPage";
import { Option, Repository } from "../App/store/repositories";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
});

const API = class {
  constructor() {}

  fetchRepositories = (value: string, type: Option, currentPage: number) => {
    return instance.get<Repository[]>(
      `orgs/${value}/repos?&type=${type.key}&per_page=21&page=${currentPage}`
    );
  };

  fetchOne = async (owner: string, repo: string) => {
    return instance.get<FullRepository>(`repos/${owner}/${repo}`);
  };
};

export default new API();
