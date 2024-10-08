import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction, useState } from "react";

type PropsTypes = {
  deleteUser: User | any;
  setDeleteUser: Dispatch<SetStateAction<{}>>;
  setUserData: Dispatch<SetStateAction<User[]>>;
  session: any;
};

const ModalDeleteUser = (props: any) => {
  const { deleteUser, setDeleteUser, setUserData, session } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteusers(
      deleteUser.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setDeleteUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
    } else {
      setIsLoading(false);
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
