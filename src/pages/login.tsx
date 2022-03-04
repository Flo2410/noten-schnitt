import { UserContext } from "context/UserContext";
import Router from "next/router";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { UserPayloadType } from "types/user.types";

interface UserFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);
  const [form_data, setFormData] = useState<UserFormData>({ password: "", username: "" });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.cookie) Router.push("/noten");
  }, []);

  const inputChange = (value: Partial<UserFormData>): void =>
    setFormData({ ...form_data, ...value });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    const form = new URLSearchParams();
    form.append("username", form_data.username);
    form.append("password", form_data.password);

    fetch("/api/login", {
      method: "POST",
      body: form,
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log("body", data);

        dispatchUser({
          type: UserPayloadType.INIT,
          payload: { cookie: data.cookie, matnummer: data.matnummer },
        });

        setError(false);

        Router.push("/noten");
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form className="flex flex-col w-1/4 gap-2 p-4 bg-gray-500 h-1/4" onSubmit={submit}>
        <span>Login</span>
        {error && <span className="text-red-700">Username or password wrong!</span>}
        <input
          type="text"
          className="w-full"
          placeholder="username"
          onChange={(e) => inputChange({ username: e.target.value })}
        />
        <input
          type="password"
          className="w-full"
          placeholder="password"
          onChange={(e) => inputChange({ password: e.target.value })}
        />
        <input type="submit" className="w-full bg-blue-400 cursor-pointer" value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
