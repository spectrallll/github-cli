import Api from "@config/api";
import { action, makeAutoObservable } from "mobx";

export type Repository = {
  name: string;
  updated_at: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
  stargazers_count: string;
};

export type Option = {
  key: string;
  name: string;
};

class Repositories {
  repositories: Repository[] = [];
  state: string = "";
  value: string = "";
  type: Option = {
    key: "all",
    name: "All",
  };
  currentPage = 1;
  more = true;
  constructor() {
    makeAutoObservable(this);
  }

  setValue = (value: string) => {
    this.value = value;
  };

  setType = (type: Option) => {
    this.type = type;
  };

  setCurrentPage = (page: number | null = null) => {
    this.currentPage = page || 1;
  };

  setRepositories = (repos: Repository[]) => {
    this.repositories = this.repositories.concat(repos);
  };

  setMore = (isMore: boolean) => {
    this.more = isMore;
  };

  fetchRepos = () => {
    this.repositories = [];
    this.setMore(true);
    this.currentPage = 1;
    this.state = "pending";
    Api.fetchRepositories(this.value, this.type, this.currentPage).then(
      action("fetchSuccess", (data) => {
        const list = data.data;
        this.setRepositories(list);
        this.state = "success";
        this.setCurrentPage(this.currentPage + 1);
      }),
      action("fetchError", (err) => {
        this.state = "error";
      })
    );
  };

  fetchData = () => {
    this.state = "pending";
    Api.fetchRepositories(this.value, this.type, this.currentPage).then(
      action("fetchSuccess", (res) => {
        const { data } = res;
        if (data.length === 0) this.setMore(false);
        this.setRepositories(data);
        this.state = "success";
        this.setCurrentPage(this.currentPage + 1);
      }),
      action("fetchError", (err) => {
        this.state = "error";
      })
    );
  };
}

export default new Repositories();
