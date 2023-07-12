"use client";

import Button from "components/Button";
import { Card } from "components/Card";
import { HorizontalLodingSpinner } from "components/HorizontalLoadingSpinner";
import { signIn, useSession } from "next-auth/react";
import { FC, FormEvent, useState } from "react";

export const Reauth: FC<{ done: () => void }> = ({ done }) => {
  const [is_loading, set_is_loading] = useState(false);
  const [password, set_password] = useState<string>("");
  const [error, setError] = useState(false);

  const session = useSession();

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (is_loading) return;

    set_is_loading(true);

    const signin_res = await signIn("credentials", {
      redirect: false,
      email: session.data?.user.email,
      password: password,
    });

    console.log("email:", session.data?.user.email);
    console.log("pw:", password);
    console.log("signin_res:", signin_res);

    if (signin_res?.ok && !signin_res.error) {
      done();
      setError(false);
    } else {
      setError(true);
    }

    set_is_loading(false);
  };

  return (
    <div className="flex flex-1 items-center justify-center px-2">
      <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/4">
        <form className="flex w-full flex-col gap-4 p-4" onSubmit={submit}>
          <h3 className="text-center text-2xl font-bold uppercase">
            Re-enter your password
          </h3>
          {error && <span className="text-red-400">Password is wrong!</span>}

          <input
            type="password"
            className="w-full rounded border-2 border-primary px-2 py-1 dark:border-white dark:bg-primary"
            placeholder="password"
            onChange={(e) => set_password(e.target.value)}
          />
          <Button type="submit" disabled={is_loading} className="group">
            {!is_loading && "Login"}
            {is_loading && <HorizontalLodingSpinner />}
          </Button>
        </form>
      </Card>
    </div>
  );
};
