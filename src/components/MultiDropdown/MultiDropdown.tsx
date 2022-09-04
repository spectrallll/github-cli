import React from "react";

import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (disabled) return;
    setOpen(!open);
  };

  React.useEffect(() => {
    setOpen(false);
  }, [disabled]);

  const handleChange = (obj: Option) => {
    if (value.includes(obj)) {
      onChange(value.filter((item) => item !== obj));
    } else {
      onChange([...value, obj]);
    }
  };

  return (
    <div
      className={classNames(
        styles.dropdown,
        open && styles.focus,
        disabled && styles.disabled
      )}
    >
      <div className={styles.title} onClick={handleClick}>
        {pluralizeOptions(value)}
      </div>
      {open && (
        <div className={styles.selectable}>
          {options.map((obj) => (
            <div
              key={obj.key}
              onClick={() => handleChange(obj)}
              className={classNames(
                styles.select,
                value.includes(obj) && styles.selected
              )}
            >
              {obj.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
