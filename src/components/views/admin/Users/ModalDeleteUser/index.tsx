import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/context/ToasterContext";

type PropsTypes = {
  deleteUser: User | any;
  setDeleteUser: Dispatch<SetStateAction<{}>>;
  setUserData: Dispatch<SetStateAction<User[]>>;
};

const ModalDeleteUser = (props: any) => {
  const { deleteUser, setDeleteUser, setUserData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const handleDelete = async () => {
    const result = await userServices.deleteusers(deleteUser.id);
    if (result.status === 200) {
      setIsLoading(false);
      setDeleteUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
      setToaster({
        variant: "success",
        message: "Success Delete User ",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete User ",
      });
    }
  };

  return (
    <Modal onClose={() => setDeleteUser({})}>
      <h1 className={styles.modal__title}>Are you sure want to delete?</h1>
      <Button type="submit" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
