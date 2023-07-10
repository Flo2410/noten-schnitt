"use client";
import Button from "components/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <Button inverted_colors={false} onClick={logout} className="w-full md:w-auto">
      Logout
    </Button>
  );
};
