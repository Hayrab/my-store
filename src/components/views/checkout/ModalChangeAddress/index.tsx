import Modal from "@/components/ui/Modal";
import styles from "./ModalChangeAddress.module.scss";
import { Dispatch, SetStateAction } from "react";

type PropsTypes = {
  address: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: PropsTypes) => {
  const { setChangeAddress, setSelectedAddress, address, selectedAddress } =
    props;

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className={styles.modal__title}>Change shipping address</h1>
      {address.map((item: any, id: number) => (
        <div
          key={item.addressLine}
          className={`${styles.modal__address} ${
            id === selectedAddress && styles["modal__address--active"]
          }`}
          onClick={() => {
            setSelectedAddress(id);
            setChangeAddress(false);
          }}
        >
          <h4 className={styles.modal__address__title}>
            {item.recipient} -{item.phone}
          </h4>
          <p className={styles.modal__address__address}>{item.addressLine}</p>
          <p className={styles.modal__address__note}>{item.note}</p>
        </div>
      ))}
    </Modal>
  );
};

export default ModalChangeAddress;
