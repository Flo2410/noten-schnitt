"use client";
import React, { FormEvent, useState } from "react";
import Loading from "components/Loading";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card } from "components/Card";
import Button from "components/Button";
import { HorizontalLodingSpinner } from "components/HorizontalLoadingSpinner";

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
      router.push("/grades");
      setError(false);
    } else {
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-1 px-2">
      <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/4">
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
          <Button type="submit" disabled={isLoading} className="group">
            {!isLoading && "Login"}
            {isLoading && <HorizontalLodingSpinner />}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
