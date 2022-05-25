import Footer from "components/Footer";
import Loading from "components/Loading";
import { UserContext } from "context/UserContext";
import Router from "next/router";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { User, UserPayloadType } from "types/user.types";

interface UserFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);
  const [form_data, setFormData] = useState<UserFormData>({ password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.cookie) Router.push("/noten");
  }, []);

  const inputChange = (value: Partial<UserFormData>): void =>
    setFormData({ ...form_data, ...value });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const form = new URLSearchParams();
    form.append("username", form_data.username);
    form.append("password", form_data.password);

    fetch("/api/login", {
      method: "POST",
      body: form,
    })
      .then((data) => data.json())
      .then((data: User) => {
        dispatchUser({
          type: UserPayloadType.INIT,
          payload: data,
        });

        setError(false);
        setLoading(false);

        Router.push("/noten");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen px-2 md:px-0">
      <div></div>
      <form
        className="flex flex-col w-full gap-4 p-4 bg-blue-500 rounded-lg shadow-lg md:w-2/3 lg:w-1/2 xl:w-1/4"
        onSubmit={submit}
      >
        <h3 className="text-2xl font-bold text-center">Login</h3>
        {error && <span className="text-red-400">Username or password wrong!</span>}
        <input
          type="text"
          className="w-full px-2 py-1 rounded-md"
          placeholder="username"
          onChange={(e) => inputChange({ username: e.target.value })}
        />
        <input
          type="password"
          className="w-full px-2 py-1 rounded-md"
          placeholder="password"
          onChange={(e) => inputChange({ password: e.target.value })}
        />
        <input
          type="submit"
          className="w-full py-2 bg-green-400 rounded-md cursor-pointer"
          value="Login"
        />
      </form>

      <Footer className="flex" />

      {loading && <Loading />}
    </div>
  );
};

export default LoginPage;
