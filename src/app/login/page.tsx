"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Loading from "components/Loading";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface UserFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form_data, setFormData] = useState<UserFormData>({ password: "", username: "" });
  const [error, setError] = useState(false);
  // const [user, login] = useUserStore((state) => [state.user, state.login]);

  const router = useRouter();

  // const globalLogout = useGlobalLogout();

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
      // router.push("/noten");
      router.push("/");
    } else {
      setError(true);
    }

    setIsLoading(false);

    // login(form_data.username, form_data.password)
    //   .then(() => {
    //     setError(false);
    //     // setIsLoading(false);
    //     router.push("/noten");
    //   })
    //   .catch((err) => {
    //     console.error(err);

    //     setIsLoading(false);
    //     setError(true);

    //     globalLogout(false);
    //   });
  };

  return (
    <form
      className="flex flex-col w-full gap-4 p-4 m-auto rounded-none shadow-fhwn md:w-2/3 lg:w-1/2 xl:w-1/4 dark:border"
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
      <button
        type="submit"
        className="flex items-center justify-center w-full py-2 text-lg text-white transition duration-150 ease-in border-2 rounded-md cursor-pointer gap-x-2 bg-primary hover:text-primary hover:bg-white border-primary dark:bg-white dark:border-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"
        disabled={isLoading}
      >
        Login
        {isLoading && <Loading />}
      </button>
    </form>
  );
};

export default LoginPage;
