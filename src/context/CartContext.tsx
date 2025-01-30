import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

const CartContext = createContext({
  cart: {},
  setCart: ({}) => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any>({});
  const session: any = useSession();

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
