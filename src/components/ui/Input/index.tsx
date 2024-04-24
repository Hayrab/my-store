import styles from "./input.module.scss";

type PropType = {
  label?: string;
  name: string;
  type: string;
  placeholders?: string;
};

const Input = (props: PropType) => {
  const { label, name, type, placeholders } = props;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholders}
        className={styles.container__input}
      />
    </div>
  );
};

export default Input;
