import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./ModalAddProduct.module.scss";
import { Product } from "@/types/product.type";

type PropsType = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalAddProduct = (props: PropsType) => {
  const { setModalAddProduct, setToaster, setProductsData } = props;

  const [isLoading, setIsLoadin] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);

  const handleStock = (e: any, i: number, type: string) => {
    const newStock: any = [...stockCount];
    newStock[i][type] = e.target.value;
    setStockCount(newStock);
  };

  return (
    <Modal
      onClose={() => {
        setModalAddProduct(false);
      }}
    >
      <h1>Update User</h1>
      <form className={styles.form} onSubmit={() => {}}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholders="Insert Product name"
        />
        <Input
          label="Price"
          name="price"
          type="text"
          placeholders="Insert Product name"
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Women", value: "Women" },
            { label: "Man", value: "Man" },
          ]}
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Release", value: "true" },
            { label: "Not Release", value: "false" },
          ]}
        />
        <label htmlFor="stock">stock</label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className={styles.form__stock} key={i}>
            <div className={styles.form__stock__item}>
              <Input
                label="Size"
                name="size"
                type="text"
                placeholders="Insert product size"
                onChange={(e) => handleStock(e, i, "size")}
              />
            </div>
            <div className={styles.form__stock__item}>
              <Input
                label="QTY"
                name="qty"
                type="number"
                placeholders="Insert product quantity"
                onChange={(e) => handleStock(e, i, "qty")}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className={styles.form__stock__button}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
