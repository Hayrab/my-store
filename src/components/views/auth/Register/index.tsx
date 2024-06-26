import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, use, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = () => {
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

    const result = await authServices.registerAccount(data);
    console.log(result);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email atau No Phone sudah ada");
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
        <Input label="Email" name="email" type="text" />
        <Input label="Phone" name="phone" type="text" />
        <Input label="Fullname" name="fullname" type="text" />
        <Input label="Password" name="password" type="text" />

        <Button type="submit" className={styles.register__button}>
          {isLoading ? "Loadings..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
