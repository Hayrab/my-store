import { useMemo } from "react";
import styles from "./select.module.scss";

type Option = {
  value: string;
  label: string;
  selected?: boolean;
};

type PropTypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[] | any;
  className?: string;
};

const Select = (props: PropTypes) => {
  const { label, name, defaultValue, disabled, options, className } = props;

  const optionsContainer = useMemo(() => {
    return (
      <>
        {options?.map((option: Option) => (
          <option
            value={option.value}
            key={option.label}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </>
    );
  }, [options]);

  return (
    <div className={`${styles.container} ${className}`}>
      <label className={styles.container__label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.container__division}>
        <select
          name={name}
          id={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={styles.container__division__select}
        >
          {optionsContainer}
        </select>
      </div>
    </div>
  );
};

export default Select;
