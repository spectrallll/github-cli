import React from "react";

import classNames from "classnames";

import styles from "./CheckBox.module.scss";

type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  disabled,
  ...rest
}) => {
  return (
    <label>
      <input
        checked={checked}
        disabled={disabled}
        className={styles.inputCheck}
        type="checkbox"
        {...rest}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={classNames(
          styles.checkbox,
          checked && styles.active,
          disabled && styles.disabled
        )}
        aria-hidden={true}
      >
        {checked && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="8.91978"
              y1="18.4979"
              x2="1.84871"
              y2="11.4268"
              stroke="#FF5555"
              strokeWidth="3"
            />
            <line
              x1="7.86265"
              y1="17.4337"
              x2="18.4337"
              y2="6.86268"
              stroke="#FF5555"
              strokeWidth="3"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default CheckBox;
