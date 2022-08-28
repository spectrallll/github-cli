import React from "react";

import classNames from "classnames";

import Loader from "../Loader";
import { LoaderSize } from "../Loader/Loader";
import styles from "./Button.module.scss";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  color,
  className,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        (rest.disabled || loading) && styles.disabled,
        color ? styles[color] : styles.primary,
        className
      )}
      {...rest}
      disabled={loading || rest.disabled}
    >
      {loading ? (
        <>
          <Loader size={LoaderSize.s} /> {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
