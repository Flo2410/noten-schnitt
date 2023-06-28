"use client";
import Footer from "components/Footer";
import React, { FormEvent, useEffect, useState } from "react";
import { useUserStore } from "stores/userStore";
import Loading from "components/Loading";
import { useGlobalLogout } from "hooks/useLogout";
import { useRouter } from "next/navigation";

interface UserFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form_data, setFormData] = useState<UserFormData>({ password: "", username: "" });
  const [error, setError] = useState(false);
  const [user, login] = useUserStore((state) => [state.user, state.login]);

  const router = useRouter();

  const globalLogout = useGlobalLogout();

  useEffect(() => {
    if (user.cookies.asp_net_core) router.push("/noten");
  }, []);

  const inputChange = (value: Partial<UserFormData>): void =>
    setFormData({ ...form_data, ...value });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    Promise.all([login(form_data.username, form_data.password)])
      .then(() => {
        setError(false);
        // setIsLoading(false);
        router.push("/noten");
      })
      .catch((err) => {
        console.error(err);

        setIsLoading(false);
        setError(true);

        globalLogout(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen px-2 md:px-0 body-setup">
      <div></div>
      <form
        className="flex flex-col w-full gap-4 p-4 rounded-none shadow-fhwn md:w-2/3 lg:w-1/2 xl:w-1/4 dark:border"
        onSubmit={submit}
      >
        <h3 className="text-2xl text-center uppercase heading">Login</h3>
        {error && <span className="text-red-400">Username or password wrong!</span>}
        <input
          type="text"
          className="w-full px-2 py-1 border-2 rounded-md border-primary dark:border-white dark:bg-primary"
          placeholder="username"
          onChange={(e) => inputChange({ username: e.target.value })}
        />
        <input
          type="password"
          className="w-full px-2 py-1 border-2 rounded-md border-primary dark:border-white dark:bg-primary"
          placeholder="password"
          onChange={(e) => inputChange({ password: e.target.value })}
        />
        <input
          type="submit"
          className="w-full py-2 text-lg text-white transition duration-150 ease-in border-2 rounded-md cursor-pointer bg-primary hover:text-primary hover:bg-white border-primary dark:bg-white dark:border-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"
          value="Login"
        />
      </form>

      <Footer className="flex" />

      {isLoading && <Loading />}
    </div>
  );
};

export default LoginPage;
