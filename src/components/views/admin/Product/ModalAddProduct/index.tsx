import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalAddProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";
import productServices from "@/services/product";
import { uploadFile } from "@/lib/firebase/service";

type PropsType = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalAddProduct = (props: PropsType) => {
  const { setModalAddProduct, setToaster, setProductsData, session } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);

  const handleStock = (e: any, i: number, type: string) => {
    const newStock: any = [...stockCount];
    newStock[i][type] = e.target.value;
    setStockCount(newStock);
  };

  const uploadImage = (id: string, form: any) => {
    console.log(id);
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };
            const result = await productServices.updateProduct(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success ",
              });
            } else {
              setIsLoading(false);
            }
          }
        }
      );
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data: any = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: "",
    };

    const result = await productServices.addProduct(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };

  return (
    <Modal
      onClose={() => {
        setModalAddProduct(false);
      }}
    >
      <h1>Update User</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
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
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            { label: "Not Release", value: "false" },
          ]}
        />
        <label htmlFor="stock">Stock</label>
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
        <label>Image</label>
        <InputFile
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          name="image"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={styles.form__stock__button}
        >
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
