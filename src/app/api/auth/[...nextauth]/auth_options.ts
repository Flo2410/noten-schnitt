import "server-only";

import { login } from "helper/fhwn_cis/login";
import { get_user_info } from "helper/fhwn_cis/user";
import { get_moodle_user_info } from "helper/moodle/user";
import { MoodleClient } from "moodle-webservice";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Course } from "types/user.types";

export const auth_options: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        if (!credentials?.password || !credentials?.email) return null;

        // Login to cis
        const fhwn_session = await login(credentials.email, credentials.password);
        if (!fhwn_session) return null;

        // get user info
        const cis_user = await get_user_info(fhwn_session);
        if (!cis_user) return null;

        // CIS Login Succesfull
        // Now try moodle
        const { token } = await MoodleClient.authenticate({
          baseUrl: process.env.NEXT_PUBLIC_MOODLE_URL ?? "",
          credentials: { username: credentials.email, password: credentials.password },
        });

        if (!token) return null;
        const moodle_user = await get_moodle_user_info(token);

        const user: User = {
          ...cis_user,
          email: credentials.email,
          moodle_user: {
            token: token,
            first_name: moodle_user.firstname,
            full_name: moodle_user.fullname,
            lang: moodle_user.lang,
            last_name: moodle_user.lastname,
            user_id: moodle_user.userid,
            user_name: moodle_user.username,
            user_picture_url: moodle_user.userpictureurl,
          },
        };

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.user = { ...user };
      }

      const selected_course: Course | undefined = session?.selected_course;
      if (
        trigger === "update" &&
        selected_course &&
        token.user.courses.find(
          (course) =>
            course.name === selected_course.name &&
            course.student_pkz === selected_course.student_pkz
        )
      )
        token.user.selected_course = selected_course;

      return token;
    },
    session: async ({ session, token }) => {
      session.user = { ...token.user };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
