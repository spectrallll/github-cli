import React from "react";

import Input from "@components/Input";
import SearchButton from "@components/SearchButton";

import styles from "./SearchForm.module.scss";

type SearchFormProps = {
  handleSubmit: (value: string) => void;
  value: string;
  inputChange: (value: string) => void;
} & React.HTMLProps<HTMLFormElement>;

const SearchForm: React.FC<SearchFormProps> = ({
  handleSubmit,
  value,
  inputChange,
  ...rest
}) => {
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(value);
  };

  return (
    <form className={styles.form} onSubmit={handle}>
      <Input
        placeholder={"Введите название организации"}
        onChange={inputChange}
        value={value}
      />
      <SearchButton type="submit" />
    </form>
  );
};

export default SearchForm;
