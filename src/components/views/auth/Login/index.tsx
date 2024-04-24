import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="text" />
          <Input label="Password" name="password" type="text" />
          <Button type="submit" className={styles.login__form__button}>
            {isLoading ? "Loadings..." : "Login"}
          </Button>
        </form>
        <div className={styles.login__form__other}>
          <Button
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={styles.login__form__other__button}
            type="submit"
          >
            Login with Google
          </Button>
        </div>
      </div>

      {error && <p className={styles.login__error}>{error}</p>}
      <p className={styles.login__link}>
        Don{"'"}t Have an account? Sign Up{" "}
        <Link href="/auth/register"> Click Here </Link>
      </p>
    </div>
  );
};

export default LoginView;
