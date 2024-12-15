import Image from "next/image";
import styles from "./products.module.scss";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Card from "./card";
import Link from "next/link";

type PropsTypes = {
  products: Product[];
};

const ProductsView = (props: PropsTypes) => {
  const { products } = props;

  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>ProductsView({products.length})</h1>
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
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
