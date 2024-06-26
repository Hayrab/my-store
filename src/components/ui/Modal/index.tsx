import { useEffect, useRef } from "react";
import styles from "./modal.module.scss";

type PropType = {
  children: React.ReactNode;
  onClose: any;
};

const Modal = (props: PropType) => {
  const { children, onClose } = props;

  const ref: any = useRef();
  useEffect(() => {
    const clickHandleOutsite = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", clickHandleOutsite);
    return () => {
      document.removeEventListener("mousedown", clickHandleOutsite);
    };
  }, [onClose]);
  return (
    <div className={styles.modal}>
      <div className={styles.modal__main} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
