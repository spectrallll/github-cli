import { Option } from "@store/GitHubStore/types";
import { FullRepositoryApi, RepositoryApi } from "@store/models/gitHub";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
});

class API {
  fetchRepositories = (
    value: string,
    type: Option,
    currentPage: number
  ): Promise<RepositoryApi> => {
    return instance.get<RepositoryApi[]>(
      `orgs/${value}/repos?&type=${type.key}&per_page=21&page=${currentPage}`
    );
  };

  fetchOne = async (
    owner: string,
    repo: string
  ): Promise<FullRepositoryApi> => {
    return instance.get<FullRepositoryApi>(`repos/${owner}/${repo}`);
  };
}

export default new API();
