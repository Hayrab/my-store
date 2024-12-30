import Toaster from "@/components/ui/Toaster";
import { ToasterContext } from "@/context/ToasterContext";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { ToasterType } from "@/types/toaster.type";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "admin", "member"];

type PropsType = {
  children: React.ReactNode;
};

const AppShell = (props: PropsType) => {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  return (
    <>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
};

export default AppShell;
