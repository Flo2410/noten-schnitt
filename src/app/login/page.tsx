"use client";
import React, { FormEvent, useState } from "react";
import Loading from "components/Loading";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card } from "components/Card";
import Button from "components/Button";

interface UserFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form_data, setFormData] = useState<UserFormData>({ password: "", username: "" });
  const [error, setError] = useState(false);

  const router = useRouter();

  const inputChange = (value: Partial<UserFormData>): void =>
    setFormData({ ...form_data, ...value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const signin_res = await signIn("credentials", {
      redirect: false,
      email: form_data.username,
      password: form_data.password,
    });

    if (signin_res?.ok && !signin_res.error) {
      setError(false);
      router.push("/grades");
    } else {
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <Card className="m-auto md:w-2/3 lg:w-1/2 xl:w-1/4">
      <form className="flex flex-col w-full gap-4 p-4" onSubmit={submit}>
        <h3 className="text-2xl font-bold text-center uppercase">Login</h3>
        {error && <span className="text-red-400">Username or password wrong!</span>}
        <input
          type="text"
          className="w-full px-2 py-1 border-2 rounded border-primary dark:border-white dark:bg-primary"
          placeholder="username"
          onChange={(e) => inputChange({ username: e.target.value })}
        />
        <input
          type="password"
          className="w-full px-2 py-1 border-2 rounded border-primary dark:border-white dark:bg-primary"
          placeholder="password"
          onChange={(e) => inputChange({ password: e.target.value })}
        />
        <Button type="submit" disabled={isLoading}>
          Login
          {isLoading && <Loading />}
        </Button>
      </form>
    </Card>
  );
};

export default LoginPage;
