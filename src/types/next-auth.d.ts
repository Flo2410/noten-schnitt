import { User } from "next-auth";
import "next-auth/jwt";
import { User as CustomUser } from "types/user.types";

declare module "next-auth" {
  interface User extends CustomUser {
    id?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User;
  }
}
