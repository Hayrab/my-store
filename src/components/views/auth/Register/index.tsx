import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, use, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="text" />
          <Input label="Phone" name="phone" type="text" />
          <Input label="Fullname" name="fullname" type="text" />
          <Input label="Password" name="password" type="text" />

          <Button type="submit" className={styles.register__form__button}>
            {isLoading ? "Loadings..." : "Register"}
          </Button>
        </form>
      </div>
      {error && <p className={styles.register__error}>{error}</p>}
      <p className={styles.register__link}>
        Have an account? Sign in <Link href="/auth/login"> Click Here </Link>
      </p>
    </div>
  );
};

export default RegisterView;
