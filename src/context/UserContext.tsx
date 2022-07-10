import {
  DEFAULT_USER,
  USER_COOKIE_KEY,
  User,
  UserActions,
  UserCookie,
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
      const user_cookie: Partial<User> = {
        cookie: action.payload.cookie,
      };

      localStorage.setItem(USER_COOKIE_KEY, JSON.stringify(user_cookie));

      return action.payload;
    case UserPayloadType.UPDATE:
      if (action.payload.cookie || action.payload.pers_nummer) {
        const user_cookie: UserCookie = {
          cookie: action.payload.cookie ? action.payload.cookie : state.cookie,
        };

        localStorage.setItem(USER_COOKIE_KEY, JSON.stringify(user_cookie));
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
    const getUserInfoWithCookie = async (user_cookie: UserCookie) => {
      let user;

      try {
        user = await getUserInfo(user_cookie);
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
      const user_cookie: UserCookie = JSON.parse(user_cookie_str!);

      if (user_cookie) {
        setIsLoading(true);
        getUserInfoWithCookie(user_cookie).catch((err) => console.error(err));
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
