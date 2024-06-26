import SideBar from "@/components/Fragments/Sidebar";
import styles from "./AdminLayout.module.scss";
import { url } from "inspector";

type PropsType = {
  children: React.ReactNode;
};

const listSideBarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  { title: "Prodcuts", url: "/admin/products", icon: "bxs-box" },
  { title: "Users", url: "/admin/users", icon: "bxs-group" },
];

const AdminLayout = (props: PropsType) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <SideBar lists={listSideBarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
