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
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/context/ToasterContext";

type PropsType = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  session: any;
};

const ModalAddProduct = (props: PropsType) => {
  const { setModalAddProduct, setProductsData, session } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const handleStock = (e: any, i: number, type: string) => {
    const newStock: any = [...stockCount];
    newStock[i][type] = e.target.value;
    setStockCount(newStock);
  };

  const uploadImage = (id: string, form: any) => {
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
            const result = await productServices.updateProduct(id, data);
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
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
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: "",
    };

    const result = await productServices.addProduct(data);

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
      <h1>Add Product</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="image">Image</label>
        <div className={styles.form__image}>
          {uploadedImage && (
            <Image
              width={200}
              height={200}
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              className={styles.form__image__preview}
            />
          )}
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
        />
        <Input
          className={styles.form__input}
          label="Price"
          name="price"
          type="text"
          placeholders="Insert Product Price"
        />
        <Input
          className={styles.form__input}
          label="Description"
          name="description"
          type="text"
          placeholders="Insert Description"
        />
        <Select
          className={styles.form__select}
          label="Category"
          name="category"
          options={[
            { label: "Pods", value: "Pods" },
            { label: "Vape", value: "Vape" },
          ]}
        />
        <Select
          className={styles.form__select}
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            { label: "Not Release", value: "false" },
          ]}
        />
        <h3>Stock</h3>
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
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
