export type RepositoryOwnerApi = {
  id: number | string;
  avatar_url: string;
  login: string;
  html_url: string;
};

export type RepositoryOwnerModel = {
  id: number | string;
  avatarUrl: string;
  login: string;
  htmlUrl: string;
};

export const normalizeRepositoryOwner = (
  from: RepositoryOwnerApi
): RepositoryOwnerModel => {
  return {
    id: from.id,
    avatarUrl: from.avatar_url,
    login: from.login,
    htmlUrl: from.html_url,
  };
};
