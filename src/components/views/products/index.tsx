import Image from "next/image";
import styles from "./products.module.scss";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Card from "./card";
import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import { useCallback, useEffect, useState } from "react";

type PropsTypes = {
  products: Product[];
};

const ProductsView = (props: PropsTypes) => {
  const { products } = props;
  const [productRes, setProductRes] = useState<Product[]>([]);

  useEffect(() => {
    setProductRes(products);
  }, [products]);

  const handleSearch = useCallback(
    (term: string) => {
      const filtereds = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setProductRes(filtereds);
    },
    [products]
  );

  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>ProductsView({products.length})</h1>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.product__main}>
        <div className={styles.product__main__filter}>
          <div className={styles.product__main__filter__data}>
            <div className={styles.product__main__filter__data__title}>
              Filter
              <i className="bx bx-chevron-right"></i>
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
          {productRes.map((product) => (
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
