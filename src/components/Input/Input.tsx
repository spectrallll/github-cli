import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  ...rest
}) => {
  return (
    <input
      className={classNames(
        styles.input,
        rest.disabled && styles.disabled,
        className
      )}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
};

export default Input;
