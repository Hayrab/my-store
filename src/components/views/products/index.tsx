import Image from "next/image";
import styles from "./products.module.scss";
import { Product } from "@/types/product.type";

type PropsTypes = {
  products: Product[];
};

const ProductsView = (props: PropsTypes) => {
  const { products } = props;

  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>ProductsView</h1>
      <div className={styles.product__main}>
        <div className={styles.product__main__filter}>
          <div className={styles.product__main__filter__data}>
            <div className={styles.product__main__filter__data__title}>
              Filter
            </div>
            <div className={styles.product__main__filter__data__list}>
              <div className={styles.product__main__filter__data__list__item}>
                <input type="checkbox" id="black" />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                  htmlFor="black"
                >
                  Black
                </label>
              </div>
              <div className={styles.product__main__filter__data__list__item}>
                <input type="checkbox" id="red" />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                  htmlFor="red"
                >
                  Red
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.product__main__content}>
          <h2>product</h2>
          <div className={styles.product__main__content__item}>
            {products.map((product, index) => (
              <div key={product.id}>
                <Image
                  width={500}
                  height={500}
                  src={product.image}
                  alt={product.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
