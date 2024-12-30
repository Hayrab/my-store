import styles from "./input.module.scss";

type PropType = {
  label?: string;
  name: string;
  type: string;
  placeholders?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Input = (props: PropType) => {
  const {
    label,
    name,
    type,
    placeholders,
    defaultValue,
    disabled,
    onChange,
    className,
  } = props;

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.container__label}>
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholders}
        className={styles.container__input}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
