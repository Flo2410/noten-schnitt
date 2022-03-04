import { DEFAULT_USER, User, UserActions, UserPayloadType } from "types/user.types";
import React, { createContext, useReducer, Dispatch } from "react";

export const UserContext = createContext<{
  state: User;
  dispatch: Dispatch<UserActions>;
}>({
  state: DEFAULT_USER,
  dispatch: () => null,
});

const reducer = (state: User, action: UserActions) => {
  switch (action.type) {
    case UserPayloadType.UPDATE:
      return { ...state, ...action.payload };
    case UserPayloadType.RESET:
      return DEFAULT_USER;
  }
};

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_USER);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
