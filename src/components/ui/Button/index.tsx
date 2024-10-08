import styles from "./button.module.scss";

type PropType = {
  onClick?: () => void;
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  variant?: string;
  className?: string;
  disabled?: boolean;
};

const Button = (props: PropType) => {
  const {
    onClick,
    type,
    children,
    variant = "primary",
    className,
    disabled,
  } = props;

  return (
    <div className={styles.container}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles[variant]} ${styles.button} ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
