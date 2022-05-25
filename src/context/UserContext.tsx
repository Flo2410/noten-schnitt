import {
  DEFAULT_USER,
  USER_COOKIE_KEY,
  User,
  UserActions,
  UserCookie,
  UserPayloadType,
} from "types/user.types";
import React, { createContext, useReducer, Dispatch, ReactNode, useEffect } from "react";

export const UserContext = createContext<{
  state: User;
  dispatch: Dispatch<UserActions>;
}>({
  state: DEFAULT_USER,
  dispatch: () => null,
});

const reducer = (state: User, action: UserActions) => {
  switch (action.type) {
    case UserPayloadType.INIT:
      const user_cookie: Partial<User> = {
        cookie: action.payload.cookie,
        pers_nummer: action.payload.pers_nummer,
      };

      localStorage.setItem(USER_COOKIE_KEY, JSON.stringify(user_cookie));

      return action.payload;
    case UserPayloadType.UPDATE:
      if (action.payload.cookie || action.payload.pers_nummer) {
        const user_cookie: UserCookie = {
          cookie: action.payload.cookie ? action.payload.cookie : state.cookie,
          pers_nummer: (action.payload.pers_nummer ? action.payload.mat_nummer : state.mat_nummer)!,
        };

        localStorage.setItem(USER_COOKIE_KEY, JSON.stringify(user_cookie));
      }

      return { ...state, ...action.payload };
    case UserPayloadType.RESET:
      localStorage.removeItem(USER_COOKIE_KEY);
      return DEFAULT_USER;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_USER);

  useEffect(() => {
    const user_cookie_str = localStorage.getItem(USER_COOKIE_KEY);

    try {
      const user_cookie: UserCookie = JSON.parse(user_cookie_str!);

      if (user_cookie) {
        dispatch({
          type: UserPayloadType.UPDATE,
          payload: user_cookie,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
