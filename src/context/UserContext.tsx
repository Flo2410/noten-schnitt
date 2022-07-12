import {
  DEFAULT_USER,
  USER_COOKIE_KEY,
  User,
  UserActions,
  UserCookies,
  UserPayloadType,
} from "types/user.types";
import React, { createContext, useReducer, Dispatch, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { getNoten, getUserInfo, postLogin } from "helper/apicalls";

export const UserContext = createContext<{
  state: User;
  dispatch: Dispatch<UserActions>;
  logout: () => void;
  login: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}>({
  state: DEFAULT_USER,
  dispatch: () => null,
  logout: () => null,
  login: async () => {},
  isLoading: false,
});

const reducer = (state: User, action: UserActions) => {
  switch (action.type) {
    case UserPayloadType.INIT:
      const user_cookies: UserCookies = action.payload.cookies;

      localStorage.setItem(USER_COOKIE_KEY, JSON.stringify(user_cookies));

      return action.payload;
    case UserPayloadType.UPDATE:
      if (action.payload.cookies) {
        const user_cookies: UserCookies = { ...state.cookies, ...action.payload.cookies };

        localStorage.setItem(USER_COOKIE_KEY, JSON.stringify(user_cookies));
      }

      return { ...state, ...action.payload };

    case UserPayloadType.UPDATE_NOTE:
      const unmodified_note = state.noten?.find(
        (note) => note.internal_id === action.payload.internal_id
      );

      if (!unmodified_note) return state;

      const updated_note = { ...unmodified_note, ...action.payload };

      const updated_noten = state.noten?.map((note) =>
        note.internal_id === updated_note.internal_id ? updated_note : note
      );

      return { ...state, ...{ noten: updated_noten } };

    case UserPayloadType.RESET:
      localStorage.removeItem(USER_COOKIE_KEY);
      return DEFAULT_USER;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserInfoWithCookie = async (user_cookies: UserCookies) => {
      let user;

      try {
        user = await getUserInfo(user_cookies);
      } catch (error) {
        logout();
        return;
      }

      /*
       * Get Noten
       */

      const noten = await getNoten(user);

      if (!noten) throw new Error("Error getting grades");

      user.noten = noten;

      dispatch({
        type: UserPayloadType.INIT,
        payload: user,
      });
      setIsLoading(false);
    };

    const user_cookie_str = localStorage.getItem(USER_COOKIE_KEY);

    try {
      const user_cookies: UserCookies = JSON.parse(user_cookie_str!);

      if (user_cookies) {
        setIsLoading(true);
        getUserInfoWithCookie(user_cookies).catch((err) => console.error(err));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);

    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const user = await postLogin(form).catch(() => {
      setIsLoading(false);
      throw new Error("Login error");
    });

    /*
     * Get Noten
     */

    const noten = await getNoten(user).catch(() => {
      setIsLoading(false);
      throw new Error("Error getting grades");
    });

    user.noten = noten;

    dispatch({
      type: UserPayloadType.INIT,
      payload: user,
    });
    setIsLoading(false);
  };

  const logout = () => {
    dispatch({
      type: UserPayloadType.RESET,
    });
    setIsLoading(false);
    Router.push("/login");
  };

  return (
    <UserContext.Provider value={{ state, dispatch, logout, login, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
