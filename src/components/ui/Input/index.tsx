import styles from "./input.module.scss";

type PropType = {
  label?: string;
  name: string;
  type: string;
  placeholders?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: PropType) => {
  const { label, name, type, placeholders, defaultValue, disabled } = props;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholders}
        className={styles.container__input}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
