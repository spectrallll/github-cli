import React from "react";

import classNames from "classnames";

import styles from "./Dropdown.module.scss";

type Option = {
  key: string;
  name: string;
};

export type DropdownProps = {
  options: Option[];
  currentValue: Option;
  onChange: (value: Option) => void;
  disabled?: boolean;
  title?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  currentValue,
  onChange,
  disabled,
  title,
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
    if (currentValue.name === obj.name) {
      return;
    } else {
      onChange(obj);
      setOpen(false);
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
        {title} {currentValue.name}
      </div>
      {open && (
        <div className={styles.selectable}>
          {options.map((obj) => (
            <div
              key={obj.key}
              onClick={() => handleChange(obj)}
              className={classNames(
                styles.select,
                currentValue.name === obj.name && styles.selected
              )}
            >
              {obj.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Dropdown);
