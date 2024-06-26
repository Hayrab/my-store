import { useMemo } from "react";
import styles from "./select.module.scss";

type Option = {
  value: string;
  label: string;
};

type PropTypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
};

const Select = (props: PropTypes) => {
  const { label, name, defaultValue, disabled, options } = props;

  const optionsContainer = useMemo(() => {
    return (
      <>
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.value}
          </option>
        ))}
      </>
    );
  }, [options]);

  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
      >
        {optionsContainer}
      </select>
    </div>
  );
};

export default Select;
