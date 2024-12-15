import styles from "./card.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type PropsTypes = {
  product: Product;
};

const Card = (props: PropsTypes) => {
  const { product } = props;
  return (
    <div className={styles.card}>
      <Image
        width={500}
        height={500}
        src={product.image}
        alt={product.name}
        className={styles.card__image}
      />
      <h4 className={styles.card__title}>{product.name}</h4>
      <p className={styles.card__category}>{product.category}</p>
      <p className={styles.card__price}>{convertIDR(product.price)}</p>
    </div>
  );
};

export default Card;
