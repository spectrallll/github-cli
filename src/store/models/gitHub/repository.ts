import {
  normalizeRepositoryOwner,
  RepositoryOwnerApi,
  RepositoryOwnerModel,
} from "@store/models/gitHub/repositoryOwner";

export type RepositoryApi = {
  id: number;
  name: string;
  updated_at: string;
  html_url: string;
  owner: RepositoryOwnerApi;
  stargazers_count: string;
};

export type RepositoryModel = {
  id: number;
  name: string;
  updatedAt: Date;
  htmlUrl: string;
  owner: RepositoryOwnerModel;
  stargazersCount: string;
};

export const normalizeRepository = (from: RepositoryApi): RepositoryModel => {
  return {
    id: from.id,
    name: from.name,
    updatedAt: new Date(from.updated_at),
    htmlUrl: from.html_url,
    owner: normalizeRepositoryOwner(from.owner),
    stargazersCount: from.stargazers_count,
  };
};
