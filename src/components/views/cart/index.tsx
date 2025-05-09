import { Product } from "@/types/product.type";
import styles from "./Cart.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { CartContext } from "@/context/CartContext";
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/context/ToasterContext";
import productServices from "@/services/product";
import Link from "next/link";

const CartView = () => {
  const { cart, setCart }: any = useContext(CartContext);
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getType = (id: string, selected: string) => {
    const options = getProduct(id)
      ?.stock.filter((stock: { size: string; qty: number }) => stock.qty > 0)
      .map((stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      });
    return options;
  };

  const sumTotal = () => {
    const total = cart?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  const handleDeleteProduct = async (id: string, size: string) => {
    const newCart = cart.filter((item: { id: string; size: string }) => {
      return item.id !== id || item.size !== size;
    });

    try {
      const result = await userServices.addToCart({
        carts: newCart,
      });
      if (result.status === 200) {
        setCart(newCart);
        setToaster({
          variant: "success",
          message: "Success delete item",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Failed delete item",
      });
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__main}>
        <h1 className={styles.cart__main__title}>Cart</h1>
        {cart.length > 0 ? (
          <div className={styles.cart__main__list}>
            {cart?.map((item: { id: string; size: string; qty: number }) => (
              <Fragment key={`${item.id} - ${item.size}`}>
                <div className={styles.cart__main__list__item}>
                  {getProduct(item.id)?.image && (
                    <Image
                      width={150}
                      height={150}
                      src={`${getProduct(item.id)?.image}`}
                      alt={`${item.id} - ${item.size}`}
                      className={styles.cart__main__list__item__image}
                    />
                  )}

                  <div className={styles.cart__main__list__item__info}>
                    <h4 className={styles.cart__main__list__item__info__title}>
                      {`${getProduct(item.id)?.name}`}
                    </h4>
                    <p
                      className={styles.cart__main__list__item__info__category}
                    >{`${getProduct(item.id)?.category}`}</p>

                    <div className={styles.cart__main__list__item__info__data}>
                      <label
                        className={
                          styles.cart__main__list__item__info__data__size
                        }
                      >
                        Type
                        <Select
                          name="type"
                          options={getType(item.id, item.size)}
                        />
                      </label>
                      <label
                        className={
                          styles.cart__main__list__item__info__data__qty
                        }
                      >
                        Quantity
                        <Input
                          name="qty"
                          type="number"
                          className={
                            styles.cart__main__list__item__info__data__qty__input
                          }
                          defaultValue={item.qty}
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className={styles.cart__main__list__item__info__delete}
                      onClick={() => handleDeleteProduct(item.id, item.size)}
                    >
                      <i className="bx bxs-trash"></i>
                    </button>
                  </div>
                  <h4 className={styles.cart__main__list__item__price}>
                    {convertIDR(getProduct(item.id)?.price)}
                  </h4>
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <h2> Is Empty</h2>
        )}
      </div>
      <div className={styles.cart__summary}>
        <h1 className={styles.cart__summary__title}> Summary</h1>
        <div className={styles.cart__summary__item}>
          <h4>SubTotal</h4>
          <p> {convertIDR(sumTotal())}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Delivery</h4>
          <p> {convertIDR(0)}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Tax</h4>
          <p> {convertIDR(0)}</p>
        </div>
        <hr />
        <div className={styles.cart__summary__item}>
          <h4>Total</h4>
          <p> {convertIDR(sumTotal())}</p>
        </div>
        <Link href="/checkout">
          <Button type="submit" className={styles.cart__summary__button}>
            Check Out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartView;
