import SideBar from "@/components/Fragments/Sidebar";
import styles from "./MemberLayout.module.scss";
import { url } from "inspector";

type PropsType = {
  children: React.ReactNode;
};

const listSideBarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  { title: "Order", url: "/member/orders", icon: "bxs-cart" },
  { title: "Profile", url: "/member/profile", icon: "bxs-user" },
];

const MemberLayout = (props: PropsType) => {
  const { children } = props;
  return (
    <div className={styles.member}>
      <SideBar lists={listSideBarItem} />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
};

export default MemberLayout;
