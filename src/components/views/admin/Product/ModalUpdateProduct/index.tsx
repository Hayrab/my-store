import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "../ModalProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";
import productServices from "@/services/product";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

type PropsType = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  updatedProduct: Product | any;
  session: any;
};

const ModalUpdateProduct = (props: PropsType) => {
  const { updatedProduct, setUpdatedProduct, setProductsData, session } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const handleStock = (e: any, i: number, type: string) => {
    const newStock: any = [...stockCount];
    newStock[i][type] = e.target.value;
    setStockCount(newStock);
  };

  const updateProduct = async (
    form: any,
    newImageUrl: string = updatedProduct.Image
  ) => {
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: newImageUrl,
    };
    const result = await productServices.updateProduct(updatedProduct.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      const { data } = await productServices.getAllProducts();
      setUpdatedProduct(false);
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Product ",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Product ",
      });
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const file = form.image.files[0];
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            updateProduct(form, newImageUrl);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Update Product ",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <Modal
      onClose={() => {
        setUpdatedProduct(false);
      }}
    >
      <h1>Update User</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="image">Image</label>
        <div className={styles.form__image}>
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="image"
            className={styles.form__image__preview}
          />
          <InputFile
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            name="image"
          />
        </div>
        <Input
          className={styles.form__input}
          label="Name"
          name="name"
          type="text"
          placeholders="Insert Product name"
          defaultValue={updatedProduct.name}
        />
        <Input
          className={styles.form__input}
          label="Price"
          name="price"
          type="text"
          placeholders="Insert Product name"
          defaultValue={updatedProduct.price}
        />
        <Input
          className={styles.form__input}
          label="Description"
          name="description"
          type="text"
          placeholders="Insert Description"
          defaultValue={updatedProduct.description}
        />
        <Select
          className={styles.form__select}
          label="Category"
          name="category"
          options={[
            { label: "Pods", value: "Pods" },
            { label: "Vape", value: "Vape" },
          ]}
          defaultValue={updatedProduct.stock}
        />
        <Select
          className={styles.form__select}
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            { label: "Not Release", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
        />
        <label htmlFor="stock">Stock</label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className={styles.form__stock} key={i}>
            <div className={styles.form__stock__item}>
              <Input
                className={styles.form__input}
                label="Size"
                name="size"
                type="text"
                placeholders="Insert product size"
                onChange={(e) => handleStock(e, i, "size")}
                defaultValue={item.size}
              />
            </div>
            <div className={styles.form__stock__item}>
              <Input
                className={styles.form__input}
                label="QTY"
                name="qty"
                type="number"
                placeholders="Insert product quantity"
                onChange={(e) => handleStock(e, i, "qty")}
                defaultValue={item.qty}
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

        <Button
          type="submit"
          disabled={isLoading}
          className={styles.form__button}
        >
          {isLoading ? "Loading..." : "Update Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
