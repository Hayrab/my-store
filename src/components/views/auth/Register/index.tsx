import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, use, useContext, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/context/ToasterContext";

const RegisterView = () => {
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
        setToaster({
          variant: "success",
          message: "Your Account is success fully registered",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Email or password is Available",
      });
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText=" Have an account? Sign in"
      error={error}
    >
      <form onSubmit={handleSubmit}>
        <Input
          className={styles.register__input}
          label="Email"
          name="email"
          type="text"
        />
        <Input
          className={styles.register__input}
          label="Phone"
          name="phone"
          type="text"
        />
        <Input
          className={styles.register__input}
          label="Fullname"
          name="fullname"
          type="text"
        />
        <Input
          className={styles.register__input}
          label="Password"
          name="password"
          type="text"
        />

        <Button type="submit" className={styles.register__button}>
          {isLoading ? "Loadings..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
