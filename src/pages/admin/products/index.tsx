import ProductsAdminViews from "@/components/views/admin/Product";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const AdminProductPage = () => {
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
      <ProductsAdminViews dataProduct={products} />
    </>
  );
};

export default AdminProductPage;
