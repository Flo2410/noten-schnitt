import Footer from "components/Footer";
import Router from "next/router";
import React, { FormEvent, useState } from "react";
import { useUserStore } from "stores/userStore_v2";
import { useUserStore as useUserStore_v1 } from "stores/userStore_v1";

interface UserFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [form_data, setFormData] = useState<UserFormData>({ password: "", username: "" });
  const [error, setError] = useState(false);
  const login_v2 = useUserStore((state) => state.login);
  const login_v1 = useUserStore_v1((state) => state.login);

  // useEffect(() => {
  //   if (user.cookies.fhwn) Router.push("/noten");
  // }, [user]);

  const inputChange = (value: Partial<UserFormData>): void =>
    setFormData({ ...form_data, ...value });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    // setLoading(true);

    Promise.all([
      login_v1(form_data.username, form_data.password),
      login_v2(form_data.username, form_data.password),
    ])
      .then(() => {
        setError(false);
        // setLoading(false);
        Router.push("/noten");
      })
      .catch((err) => {
        console.error(err);

        // setLoading(false);
        setError(true);
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

      {/* {isLoading && <Loading />} */}
    </div>
  );
};

export default LoginPage;
