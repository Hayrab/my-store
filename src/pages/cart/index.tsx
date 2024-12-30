import CartView from "@/components/views/cart";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState();
  const [products, setProducts] = useState([]);
  const session: any = useSession();

  const getCart = async (session: string) => {
    const { data } = await userServices.getCart(session);
    setCart(data.data);
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <>
      <CartView cart={cart} products={products} />
    </>
  );
};
export default CartPage;
