import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

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
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't Have an account? Sign Up"
      error={error}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="text" />
        <Input label="Password" name="password" type="text" />
        <Button type="submit" className={styles.login__button}>
          {isLoading ? "Loadings..." : "Login"}
        </Button>
      </form>
      <div className={styles.login__other}>
        <Button
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.login__other__button}
          type="submit"
        >
          Login with Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
