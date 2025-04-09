import Modal from "@/components/ui/Modal";
import styles from "./ModalChangeAddress.module.scss";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import userServices from "@/services/user";
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/context/ToasterContext";

type PropsTypes = {
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: PropsTypes) => {
  const {
    setChangeAddress,
    setProfile,
    setSelectedAddress,
    profile,
    selectedAddress,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    let data;
    profile.address
      ? (data = {
          address: [
            ...profile.address,
            {
              recipient: form.recipient.value,
              phone: form.phone.value,
              addressLine: form.addressLine.value,
              note: form.note.value,
              isMain: false,
            },
          ],
        })
      : (data = {
          address: [
            {
              recipient: form.recipient.value,
              phone: form.phone.value,
              addressLine: form.addressLine.value,
              note: form.note.value,
              isMain: true,
            },
          ],
        });

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Add New Address",
        });
        form.reset();
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Add New Address",
      });
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const address = profile.address;

    address.splice(id, 1);

    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Delete Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Address",
      });
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className={styles.modal__title}>Change shipping address</h1>
      {profile?.address?.map((item: any, id: number) => (
        <div
          key={item.addressLine}
          className={`${styles.modal__address} ${
            id === selectedAddress && styles["modal__address--active"]
          }`}
          onClick={() => {
            setSelectedAddress(id);
            setChangeAddress(true);
          }}
        >
          <div className={styles.modal__address__info}>
            <h4 className={styles.modal__address__info__title}>
              {item.recipient} -{item.phone}
            </h4>
            <p className={styles.modal__address__info__address}>
              {item.addressLine}
            </p>
            <p className={styles.modal__address__info__note}>{item.note}</p>
          </div>
          <Button
            type="button"
            className={styles.modal__address__delete}
            onClick={() => handleDeleteAddress(id)}
            disabled={isLoading || id === selectedAddress}
          >
            <i className="bx bxs-trash"></i>
          </Button>
        </div>
      ))}
      <Button
        className={styles.modal__btn}
        type="button"
        onClick={() => setAddNew(!addNew)}
      >
        {addNew ? "Cancel" : "Add New Address"}
      </Button>
      {addNew && (
        <div className={styles.modal__form}>
          <form
            onSubmit={handleAddAddress}
            className={styles.modal__form__group}
          >
            <Input
              type="text"
              name="recipient"
              label="Recipient"
              placeholders="Insert Recipient"
            />
            <Input
              type="text"
              name="phone"
              label="Recipient Phone"
              placeholders="Insert Recipient Phone number"
            />
            <TextArea
              name="addressLine"
              label="Address Line"
              placeholders="Insert address line here"
            />
            <Input
              type="text"
              name="note"
              label="Note"
              placeholders="Insert note here"
            />
            <Button
              className={styles.modal__btn}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default ModalChangeAddress;
