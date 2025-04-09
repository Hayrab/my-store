import styles from "./TextArea.module.scss";

type PropType = {
  label?: string;
  name: string;
  placeholders?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const TextArea = (props: PropType) => {
  const {
    label,
    name,
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
      <textarea
        name={name}
        id={name}
        placeholder={placeholders}
        className={styles.container__input}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
