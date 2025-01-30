import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

const NavItem = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
];

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropdownUser, setDropdownUser] = useState<boolean>(false);

  return (
    <div className={styles.navbar}>
      <h1>Vape Store</h1>
      <div className={styles.navbar__list}>
        {NavItem.map((item) => (
          <Link
            key={item.title}
            className={`${styles.navbar__list__item} ${
              pathname === item.url && styles[`navbar__list__item--active`]
            }`}
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className={styles.navbar__user}>
          <Link href="/cart" className={`${styles.navbar__user__cart}`}>
            <i className="bx bx-cart "></i>
            <span className={styles.navbar__user__cart__totalcart}>4</span>
          </Link>
          <div
            className={styles.navbar__user__profile}
            onClick={() => setDropdownUser(!dropdownUser)}
          >
            <Image
              width={40}
              height={40}
              src={data?.user.image}
              alt={data?.user.name}
            />
          </div>
          <div
            className={`${styles.navbar__user__dropdown} ${
              dropdownUser && styles["navbar__user__dropdown--active"]
            }`}
          >
            <button
              className={styles.navbar__user__dropdown__item}
              onClick={() => push("/member/profile")}
            >
              Profile
            </button>
            <button
              className={styles.navbar__user__dropdown__item}
              onClick={() => signOut()}
            >
              signOut
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.navbar__button} onClick={() => signIn()}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
