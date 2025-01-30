import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Product } from "@/types/product.type";
import productServices from "@/services/product";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

type PropsTypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  session: any;
};

const ModalDeleteProduct = (props: PropsTypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData, session } = props;

  const [isLoading, setIsLoading] = useState(false);
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(deletedProduct.id);
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
