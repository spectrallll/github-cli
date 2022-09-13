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
  updatedAt: Date | string;
  htmlUrl: string;
  owner: RepositoryOwnerModel;
  stargazersCount: string;
};

export type FullRepositoryApi = RepositoryApi & {
  topics: string[];
  full_name: string;
  created_at: string;
  default_branch: string;
  language: string;
  description: string;
};

export type FullRepository = RepositoryModel & {
  topics: string[];
  fullName: string;
  createdAt: string;
  defaultBranch: string;
  language: string;
  description: string;
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

export const normalizeFullRepository = (
  from: FullRepositoryApi
): FullRepository => {
  return {
    id: from.id,
    name: from.name,
    updatedAt: new Date(from.updated_at),
    htmlUrl: from.html_url,
    owner: normalizeRepositoryOwner(from.owner),
    stargazersCount: from.stargazers_count,
    topics: from.topics,
    fullName: from.full_name,
    defaultBranch: from.default_branch,
    description: from.description,
    language: from.language,
    createdAt: from.created_at,
  };
};
