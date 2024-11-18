import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "@/types/product.type";
import productServices from "@/services/product";
import { deleteFile } from "@/lib/firebase/service";

type PropsTypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalDeleteProduct = (props: PropsTypes) => {
  const {
    deletedProduct,
    setDeletedProduct,
    setProductsData,
    session,
    setToaster,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          setDeletedProduct({});
          const { data } = await productServices.getAllProducts();
          setProductsData(data.data);
          setToaster({
            variant: "success",
            message: "Success Update Product ",
          });
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Product ",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className={styles.modal__title}>Are you sure want to delete?</h1>
      <Button type="submit" onClick={() => handleDelete()}>
        {isLoading ? "Loading..." : "Delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
