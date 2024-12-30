import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | {}>([]);
  const [cart, setCart] = useState();
  const session: any = useSession();

  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCart = async (session: string) => {
    const { data } = await userServices.getCart(session);
    setCart(data.data);
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <>
      <DetailProductView product={product} cart={cart} productId={id} />
    </>
  );
};

export default DetailProductPage;
