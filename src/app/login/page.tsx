"use client";
import Button from "components/Button";
import { Card } from "components/Card";
import { HorizontalLodingSpinner } from "components/HorizontalLoadingSpinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface UserFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form_data, setFormData] = useState<UserFormData>({ password: "", username: "" });
  const [error, setError] = useState("");

  const router = useRouter();

  const session = useSession();
  if (session.status === "authenticated") router.replace("/grades");

  const inputChange = (value: Partial<UserFormData>): void =>
    setFormData({ ...form_data, ...value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const signin_res = await signIn("credentials", {
      redirect: false,
      email: form_data.username,
      password: form_data.password,
    });

    setIsLoading(false);

    if (!signin_res?.ok || signin_res.error) {
      setError("Username or password wrong!");
      return;
    }

    if (signin_res.status !== 200) {
      setError("Something went wrong!");
      return;
    }

    setError("");
    router.push("/grades");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-2">
      <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/4">
        <form
          className="flex w-full flex-col gap-4 overflow-hidden p-4"
          onSubmit={submit}
        >
          <h3 className="text-center text-2xl font-bold uppercase">Login</h3>
          {error && <span className="text-red-400">{error}</span>}
          <input
            type="text"
            className="w-full rounded border-2 border-primary px-2 py-1 dark:border-white dark:bg-primary"
            placeholder="username"
            onChange={(e) => inputChange({ username: e.target.value })}
          />
          <input
            type="password"
            className="w-full rounded border-2 border-primary px-2 py-1 dark:border-white dark:bg-primary"
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
