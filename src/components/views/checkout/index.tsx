import { Product } from "@/types/product.type";
import styles from "./Checkout.module.scss";
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
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import ModalChangeAddress from "./ModalChangeAddress";

const CheckoutView = () => {
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<any>();
  const [seletctedAddress, setSelecetedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);
  console.log(profile);

  const session: any = useSession();

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
    data.data.address.filter((address: { isMain: boolean }, id: number) => {
      if (address.isMain) {
        setSelecetedAddress(id);
      }
    });
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const sumTotal = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  return (
    <>
      <div className={styles.checkout}>
        <div className={styles.checkout__main}>
          <h1 className={styles.checkout__main__title}>CheckOut</h1>
          <div className={styles.checkout__main__address}>
            <h3 className={styles.checkout__main__address__title}>
              Shipping Address
            </h3>
            {profile?.address?.length > 0 ? (
              <div className={styles.checkout__main__address__selected}>
                <h4 className={styles.checkout__main__address__selected__title}>
                  {profile?.address[seletctedAddress]?.recipient} -
                  {profile?.address[seletctedAddress]?.phone}
                </h4>
                <p
                  className={styles.checkout__main__address__selected__address}
                >
                  {profile?.address[seletctedAddress]?.addressLine}
                </p>
                <p className={styles.checkout__main__address__selected__note}>
                  {profile?.address[seletctedAddress]?.note}
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    setChangeAddress(true);
                  }}
                >
                  Change Address
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
          {profile?.carts?.length > 0 ? (
            <div className={styles.checkout__main__list}>
              {profile?.carts?.map(
                (item: { id: string; size: string; qty: number }) => (
                  <Fragment key={`${item.id} - ${item.size}`}>
                    <div className={styles.checkout__main__list__item}>
                      {getProduct(item.id)?.image && (
                        <Image
                          width={150}
                          height={150}
                          src={`${getProduct(item.id)?.image}`}
                          alt={`${item.id} - ${item.size}`}
                          className={styles.checkout__main__list__item__image}
                        />
                      )}

                      <div className={styles.checkout__main__list__item__info}>
                        <h4
                          className={
                            styles.checkout__main__list__item__info__title
                          }
                        >
                          {`${getProduct(item.id)?.name}`}
                        </h4>

                        <div
                          className={
                            styles.checkout__main__list__item__info__data
                          }
                        >
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__size
                            }
                          >
                            Type
                            {item.size}
                          </label>
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__qty
                            }
                          >
                            Quantity
                            {item.qty}
                          </label>
                        </div>
                      </div>
                      <h4 className={styles.checkout__main__list__item__price}>
                        {convertIDR(getProduct(item.id)?.price)}
                      </h4>
                    </div>
                  </Fragment>
                )
              )}
            </div>
          ) : (
            <h2> Is Empty</h2>
          )}
        </div>
        <div className={styles.checkout__summary}>
          <h1 className={styles.checkout__summary__title}> Summary</h1>
          <div className={styles.checkout__summary__item}>
            <h4>SubTotal</h4>
            <p> {convertIDR(sumTotal())}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Delivery</h4>
            <p> {convertIDR(0)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Tax</h4>
            <p> {convertIDR(0)}</p>
          </div>
          <hr />
          <div className={styles.checkout__summary__item}>
            <h4>Total</h4>
            <p> {convertIDR(sumTotal())}</p>
          </div>
          <Button type="submit" className={styles.checkout__summary__button}>
            Process Payment{" "}
          </Button>
        </div>
      </div>

      {changeAddress && (
        <ModalChangeAddress
          address={profile.address}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelecetedAddress}
          selectedAddress={seletctedAddress}
        />
      )}
    </>
  );
};

export default CheckoutView;
