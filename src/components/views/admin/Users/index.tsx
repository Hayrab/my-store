import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./user.module.scss";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";

type PropType = {
  dataUsers: User[];
};

const UserAdminViews = (props: PropType) => {
  const { dataUsers } = props;
  const session: any = useSession();
  const [updateUser, setUpdateUser] = useState<User | {}>({});
  const [deleteUser, setDeleteUser] = useState<User | {}>({});
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    setUserData(dataUsers);
  }, [dataUsers]);
  return (
    <>
      <AdminLayout>
        <div>
          <h1>User Admin Page</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: User, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button
                        className={styles.users__table__action__edit}
                        type="button"
                        onClick={() => setUpdateUser(user)}
                      >
                        <i className="bx bxs-edit"></i>
                      </Button>
                      <Button
                        type="button"
                        className={styles.users__table__action__delete}
                        onClick={() => setDeleteUser(user)}
                      >
                        <i className="bx bxs-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updateUser).length && (
        <ModalUpdateUser
          updatedUser={updateUser}
          setUpdatedUser={setUpdateUser}
          setUserData={setUserData}
        />
      )}
      {Object.keys(deleteUser).length && (
        <ModalDeleteUser
          deleteUser={deleteUser}
          setDeleteUser={setDeleteUser}
          setUserData={setUserData}
        />
      )}
    </>
  );
};

export default UserAdminViews;
