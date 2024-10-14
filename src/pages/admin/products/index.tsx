import ProductsAdminViews from "@/components/views/admin/Product";
import productServices from "@/services/product";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropsTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};
const AdminProductPage = ({ setToaster }: PropsTypes) => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <ProductsAdminViews dataProduct={products} setToaster={setToaster} />
    </>
  );
};

export default AdminProductPage;
