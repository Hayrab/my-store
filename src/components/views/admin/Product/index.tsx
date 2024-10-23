import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import ModalAddProduct from "./ModalAddProduct";

type PropType = {
  dataProduct: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminViews = (props: PropType) => {
  const { dataProduct, setToaster } = props;
  const session: any = useSession();
  const [modalAddProduct, setModalAddProduct] = useState(false);

  const [productsData, setProductsData] = useState<Product[]>([]);
  useEffect(() => {
    setProductsData(dataProduct);
  }, [dataProduct]);

  return (
    <>
      <AdminLayout>
        <div>
          <h1>User Admin Page</h1>
          <Button
            type="button"
            className={styles.Products__buttonAdd}
            onClick={() => setModalAddProduct(true)}
          >
            <i className="bx bx-plus"></i>
            Add Product
          </Button>
          <table className={styles.Products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Size</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => (
                <>
                  <tr key={product.id}>
                    <td rowSpan={product.stock.length}>{index + 1}</td>
                    <td rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length}>
                      {convertIDR(product.price)}
                    </td>
                    <td>{product.stock[0].size}</td>
                    <td>{product.stock[0].qty}</td>
                    <td rowSpan={product.stock.length}>
                      <div className={styles.Products__table__action}>
                        <Button
                          className={styles.Products__table__action__edit}
                          type="button"
                        >
                          <i className="bx bxs-edit"></i>
                        </Button>
                        <Button
                          type="button"
                          className={styles.Products__table__action__delete}
                        >
                          <i className="bx bxs-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr key={stock.size}>
                            <td>{stock.size}</td>
                            <td>{stock.qty}</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setProductsData={setProductsData}
          setModalAddProduct={setModalAddProduct}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default ProductsAdminViews;
