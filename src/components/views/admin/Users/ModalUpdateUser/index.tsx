import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalUpdateUser.module.scss";
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/context/ToasterContext";

type PropTypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
  setUserData: Dispatch<SetStateAction<User[]>>;
};

const ModalUpdateUser = (props: PropTypes) => {
  const { updatedUser, setUpdatedUser, setUserData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUsers(updatedUser.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
      setUpdatedUser({});
      setToaster({
        variant: "success",
        message: "Success Update User ",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "Danger",
        message: "Failed Update User ",
      });
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          className={styles.form__input}
          label="Email"
          name="email"
          type="text"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          className={styles.form__input}
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled
        />{" "}
        <Input
          className={styles.form__input}
          label="Phone"
          name="phone"
          type="text"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          className={styles.form__select}
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">{isLoading ? "Updating..." : "Update"}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
