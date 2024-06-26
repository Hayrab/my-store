import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";

const ModalDeleteUser = (props: any) => {
  const { deleteUser, setDeleteUser, setUserData } = props;

  const handleDelete = async () => {
    userServices.deleteusers(deleteUser.id);
    setDeleteUser({});
    const { data } = await userServices.getAllUsers();
    setUserData(data.data);
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
