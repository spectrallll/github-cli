import { Option } from "@store/GitHubStore";
import { RepositoryApi } from "@store/models/gitHub";
import { FullRepositoryApi } from "@store/models/gitHub";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
});

class API {
  fetchRepositories = (
    value: string,
    type: Option,
    currentPage: number
  ): Promise<{ data: RepositoryApi[] }> => {
    return instance.get(
      `orgs/${value}/repos?&type=${type.key}&per_page=21&page=${currentPage}`
    );
  };

  fetchOne = async (
    owner: string,
    repo: string
  ): Promise<{ data: FullRepositoryApi }> => {
    return instance.get<FullRepositoryApi>(`repos/${owner}/${repo}`);
  };
}

export default new API();
