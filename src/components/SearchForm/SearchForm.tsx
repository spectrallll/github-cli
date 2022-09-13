import React from "react";

import Input from "@components/Input";
import SearchButton from "@components/SearchButton";

import styles from "./SearchForm.module.scss";

type SearchFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  value: string;
  inputChange: (value: string) => void;
} & React.HTMLProps<HTMLFormElement>;

const SearchForm: React.FC<SearchFormProps> = ({
  handleSubmit,
  value,
  inputChange,
  ...rest
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        placeholder={"Введите название организации"}
        onChange={inputChange}
        value={value}
      />
      <SearchButton type="submit" />
    </form>
  );
};

export default React.memo(SearchForm);
